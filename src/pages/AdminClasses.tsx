import React, { useEffect, useMemo, useState } from "react";
import ApiHandler from "../utils/ApiHandler";
import Calendar from "../components/classes/calendar";
import "../styles/AdminClasses.css";

type UserRole = "admin" | "member" | "trainer";

type GymClass = {
  _id: string;
  title: string;
  description: string;
  trainer_id: string;
  gym_id: string;
  date: string;
  start_time: string;
  end_time: string;
  attendees?: number;
  capacity: number;
  canceled?: boolean;
  cancel_reason?: string;
  canceled_at?: string;
};

type FormState = {
  title: string;
  description: string;
  trainer_id: string;
  gym_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  capacity: number;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  instructor?: string;
  capacity?: number;
  attendees?: number;
  canceled?: boolean;
};

const EMPTY: FormState = {
  title: "",
  description: "",
  trainer_id: "",
  gym_id: "",
  date: "",
  start_time: "",
  end_time: "",
  duration_minutes: 60,
  capacity: 10,
};

function pad2(n: number) { return String(n).padStart(2, "0"); }
function computeEndFromStart(startHHmm: string, minutes: number): string {
  const [hh, mm] = startHHmm.split(":").map(Number);
  const base = new Date(2000, 0, 1, hh || 0, mm || 0, 0, 0);
  const end = new Date(base.getTime() + minutes * 60_000);
  return `${pad2(end.getHours())}:${pad2(end.getMinutes())}`;
}
function ymd(dateLike: string) { return dateLike.slice(0, 10); }
function sameDayTimes(dateLike: string, startHHmm: string, endHHmm: string) {
  const [y, m, d] = ymd(dateLike).split("-").map(Number);
  const mk = (hm: string) => {
    const [h, mi] = hm.split(":").map(Number);
    return new Date(y, (m - 1), d, h || 0, mi || 0, 0, 0);
  };
  return { start: mk(startHHmm), end: mk(endHHmm) };
}
function toEvent(row: GymClass): CalendarEvent {
  const { start, end } = sameDayTimes(row.date, row.start_time, row.end_time);
  return {
    id: row._id,
    title: row.title,
    start,
    end,
    instructor: row.trainer_id,
    capacity: row.capacity,
    attendees: row.attendees,
    canceled: row.canceled,
  };
}

const AdminClasses: React.FC = () => {
  const [rows, setRows] = useState<GymClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  const [cancelModal, setCancelModal] = useState<{ id: string | null; reason: string }>({ id: null, reason: "" });
  const [busyId, setBusyId] = useState<string | null>(null);

  const role = (localStorage.getItem("role") || "").toLowerCase() as UserRole | "";
  const email = localStorage.getItem("email") || "";
  const isTrainer = role === "trainer";
  const isAdmin = role === "admin";

  const gymId =
    localStorage.getItem("gym_id") ||
    sessionStorage.getItem("gym_id") ||
    form.gym_id ||
    "";

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!gymId) { setRows([]); return; }
      const list: GymClass[] = await ApiHandler.getAdminClasses();
      setRows(list);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClasses(); /* eslint-disable-next-line */ }, [gymId]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => `${ymd(a.date)} ${a.start_time}`.localeCompare(`${ymd(b.date)} ${b.start_time}`)),
    [rows]
  );
  const events: CalendarEvent[] = useMemo(() => sorted.map(toEvent), [sorted]);

  const startCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY, gym_id: gymId, trainer_id: isTrainer ? email : "" });
    setShowForm(true);
  };

  const startEdit = (c: GymClass) => {
    setEditingId(c._id);
    setForm({
      title: c.title,
      description: c.description,
      trainer_id: c.trainer_id,
      gym_id: c.gym_id,
      date: ymd(c.date),
      start_time: c.start_time,
      end_time: c.end_time,
      duration_minutes: 60,
      capacity: c.capacity,
    });
    setShowForm(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "capacity" || name === "duration_minutes" ? Number(value) : value }));
  };

  const save = async () => {
    if (!form.title.trim()) return setError("Title is required");
    if (!form.description.trim()) return setError("Description is required");
    if (!form.gym_id.trim()) return setError("gym_id is required");
    if (!form.date) return setError("Date is required");
    if (!form.start_time) return setError("Start time is required");
    if (!form.capacity || form.capacity < 1) return setError("Capacity must be ≥ 1");

    const trainer_id_final = isTrainer ? email : form.trainer_id.trim();
    if (!trainer_id_final) return setError("Trainer ID is required");

    let endHHmm = form.end_time;
    if (form.duration_minutes && form.duration_minutes > 0) {
      endHHmm = computeEndFromStart(form.start_time, form.duration_minutes);
    } else if (!endHHmm) {
      return setError("End time is required if no duration provided");
    }

    const { start, end } = sameDayTimes(form.date, form.start_time, endHHmm);
    if (end <= start) return setError("End time must be after start time");

    const payload = {
      title: form.title,
      description: form.description,
      trainer_id: trainer_id_final,
      gym_id: form.gym_id,
      date: ymd(form.date),
      start_time: form.start_time,
      end_time: endHHmm,
      capacity: form.capacity,
    };

    try {
      setLoading(true);
      setError(null);
      if (editingId) {
        await ApiHandler.put(`/classes/${editingId}`, payload);
      } else {
        const id = (crypto as any)?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
        await ApiHandler.post(`/classes`, { _id: id, ...payload, attendees: 0 });
      }
      setShowForm(false);
      await fetchClasses();
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (id: string) => setCancelModal({ id, reason: "" });
  const closeCancelModal = () => setCancelModal({ id: null, reason: "" });

  const confirmCancel = async () => {
    if (!cancelModal.id) return;
    try {
      setBusyId(cancelModal.id);
      await ApiHandler.put(`/classes/${cancelModal.id}/cancel`, { reason: cancelModal.reason });
      closeCancelModal();
      await fetchClasses();
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Cancel failed");
    } finally {
      setBusyId(null);
    }
  };

  const uncancel = async (id: string) => {
    try {
      setBusyId(id);
      await ApiHandler.put(`/classes/${id}/uncancel`, {});
      await fetchClasses();
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Uncancel failed");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this class? This cannot be undone.")) return;
    try {
      setBusyId(id);
      setRows((prev) => prev.filter((c) => c._id !== id)); // optimistic UI
      const res = await ApiHandler.delete(`/classes/${id}`);
      if ((res as any)?.error) {
        await fetchClasses(); // revert if server failed
        setError((res as any).error || "Delete failed");
      } else {
        await fetchClasses(); // sync up any cascading changes
      }
    } catch (e: any) {
      await fetchClasses(); // revert
      console.error(e);
      setError(e?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const canManageRow = (row: GymClass) => (isAdmin ? true : isTrainer ? row.trainer_id === email : false);

  return (
    <div className="admin-classes">
      <div className="admin-classes__header">
        <h2>Class Management</h2>
        <button
          className="btn btn-primary"
          onClick={startCreate}
          disabled={!gymId || (!isAdmin && !isTrainer)}
        >
          + New Class
        </button>
      </div>

      {!gymId && (
        <div className="alert" style={{ marginBottom: 12 }}>
          Missing <code>gym_id</code>. Make sure it’s stored after login.
        </div>
      )}

      {error && <div className="alert">{error}</div>}

      <div className="admin-classes__tablewrap">
        {loading ? (
          <div>Loading…</div>
        ) : (
          <table className="admin-classes__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Trainer</th>
                <th>Cap</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th style={{ width: 360 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr key={c._id} className={c.canceled ? "is-canceled" : ""}>
                  <td>
                    {c.title}{" "}
                    {c.canceled && <span className="badge badge-danger" style={{ marginLeft: 8 }}>Canceled</span>}
                  </td>
                  <td>{c.trainer_id}</td>
                  <td>{c.capacity}</td>
                  <td>{new Date(ymd(c.date)).toLocaleDateString()}</td>
                  <td>{c.start_time}</td>
                  <td>{c.end_time}</td>
                  <td>
                    {c.canceled ? "Canceled" : "Scheduled"}
                    {c.canceled && c.cancel_reason ? (
                      <div style={{ opacity: 0.8, fontSize: 12 }}>Reason: {c.cancel_reason}</div>
                    ) : null}
                  </td>
                  <td className="admin-classes__actions">
                    {canManageRow(c) ? (
                      <>
                        <button className="btn btn-sm" onClick={() => startEdit(c)} disabled={busyId === c._id}>Edit</button>
                        {!c.canceled ? (
                          <button className="btn btn-sm" onClick={() => openCancelModal(c._id)} disabled={busyId === c._id}>Cancel</button>
                        ) : (
                          <button className="btn btn-sm" onClick={() => uncancel(c._id)} disabled={busyId === c._id}>Uncancel</button>
                        )}
                        <button className="btn btn-sm btn-danger" onClick={() => remove(c._id)} disabled={busyId === c._id}>Delete</button>
                      </>
                    ) : (
                      <span style={{ opacity: 0.7 }}>No actions</span>
                    )}
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>No classes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-classes__calendarwrap">
        <h3 className="admin-classes__scheduleTitle">Schedule Preview</h3>
        <div className="admin-classes__calendarbox">
          <Calendar events={events} />
        </div>
      </div>

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>{editingId ? "Edit Class" : "Create Class"}</h3>

            <div className="form-grid">
              <label>Title<input name="title" value={form.title} onChange={onChange} /></label>
              <label>
                Trainer ID
                <input
                  name="trainer_id"
                  value={form.trainer_id}
                  onChange={onChange}
                  readOnly={isTrainer}
                  placeholder={isTrainer ? "Your email (locked)" : ""}
                />
              </label>
              <label>Gym ID<input name="gym_id" value={form.gym_id} onChange={onChange} /></label>
              <label>Date<input type="date" name="date" value={form.date} onChange={onChange} /></label>
              <label>Start Time<input type="time" name="start_time" value={form.start_time} onChange={onChange} /></label>
              <label>End Time (optional if Duration used)<input type="time" name="end_time" value={form.end_time} onChange={onChange} /></label>
              <label>Duration (minutes)<input type="number" name="duration_minutes" min={0} value={form.duration_minutes} onChange={onChange} /></label>
              <label>Capacity<input type="number" name="capacity" min={1} value={form.capacity} onChange={onChange} /></label>
              <label className="full">Description<textarea name="description" rows={3} value={form.description} onChange={onChange} /></label>
            </div>

            <div className="modal-actions">
              <button className="btn" onClick={() => setShowForm(false)}>Close</button>
              <button className="btn btn-primary" onClick={save}>{editingId ? "Save Changes" : "Create Class"}</button>
            </div>
          </div>
        </div>
      )}

      {cancelModal.id && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Cancel Class</h3>
            <p>This will notify all booked and waitlisted members.</p>
            <label className="full">
              Reason (optional)
              <textarea
                rows={3}
                value={cancelModal.reason}
                onChange={(e) => setCancelModal((s) => ({ ...s, reason: e.target.value }))}
              />
            </label>
            <div className="modal-actions">
              <button className="btn" onClick={() => closeCancelModal()}>Close</button>
              <button className="btn btn-danger" onClick={confirmCancel} disabled={busyId === cancelModal.id}>Confirm Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClasses;
