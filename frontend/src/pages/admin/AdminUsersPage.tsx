// pages/admin/AdminUsersPage.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import type { UserItem } from "../../types/user.type";
import { userApi } from "../../apis/user.api";

export default function AdminUsersPage() {
  // Hooks
  const { listUsers } = userApi();

  // States
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Handlers
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await listUsers({ limit, page });
      setUsers(response.data.items);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  });

  // Pages
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
            <td>botones/modals</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
