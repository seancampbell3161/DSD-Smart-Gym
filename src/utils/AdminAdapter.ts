import ApiHandler from "../utils/ApiHandler";

export type ClassPayload = {
  title: string;
  description: string;
  trainer_id: string;
  gym_id: string;
  date: string;        // "YYYY-MM-DD"
  start_time: string;  // "HH:mm"
  end_time: string;    // "HH:mm"
  capacity: number;
};

const AdminAdapter = {
  getClasses: async () => ApiHandler.getAdminClasses(),
  createClass: async (payload: ClassPayload & { _id?: string; attendees?: number }) =>
    ApiHandler.post("/classes", payload),
  updateClass: async (id: string, payload: Partial<ClassPayload>) =>
    ApiHandler.put(`/classes/${id}`, payload),
  cancelClass: async (id: string, reason?: string) =>
    ApiHandler.put(`/classes/${id}/cancel`, { reason: reason ?? "" }),
  uncancelClass: async (id: string) =>
    ApiHandler.put(`/classes/${id}/uncancel`, {}),
  deleteClass: async (id: string) =>
    ApiHandler.delete(`/classes/${id}`),
};

export default AdminAdapter;
