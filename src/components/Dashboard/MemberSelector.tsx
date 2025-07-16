// components/MemberSelector.tsx
import { useEffect, useState } from "react";

interface MemberSelectorProps {
  onSelect: (id: string) => void;
}

interface Member {
  _id: string;
  name: string;
}

export default function MemberSelector({ onSelect }: MemberSelectorProps) {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    fetch("/api/members")
      .then(r => r.json())
      .then(setMembers);
  }, []);
  return (
    <ul>
      {members.map(m => (
        <li key={m._id}>
          <button onClick={() => onSelect(m._id)}>{m.name}</button>
        </li>
      ))}
    </ul>
  );
}
