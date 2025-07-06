import withAdminGuard from '../../utils/withAdminGuard';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USERS = gql`query { getUsers }`;
const DELETE_USER = gql`mutation($username: String!) { deleteUser(username: $username) }`;
const UNLOCK_USER = gql`mutation($username: String!) { unlockUser(username: $username) }`;

function UserList() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [unlockUser] = useMutation(UNLOCK_USER);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Danh sách người dùng</h2>
        {loading && <div className="text-gray-500">Đang tải dữ liệu...</div>}
        {error && <div className="text-red-500">Lỗi: {error.message}</div>}
        <ul className="w-full flex flex-col gap-3">
          {data?.getUsers && data.getUsers.length > 0 ? (
            data.getUsers.map((u: string) => (
              <li key={u} className="flex items-center justify-between bg-orange-50 rounded px-4 py-2 border border-orange-100">
                <span className="font-medium text-gray-700">{u}</span>
                <div className="flex gap-2">
                  <button onClick={async () => { await deleteUser({ variables: { username: u.split(' - ')[0] } }); refetch(); }} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm">Xóa</button>
                  <button onClick={async () => { await unlockUser({ variables: { username: u.split(' - ')[0] } }); refetch(); }} className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition text-sm">Mở khóa</button>
                </div>
              </li>
            ))
          ) : (
            !loading && <li className="text-gray-500 text-center w-full">Không có người dùng nào.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default withAdminGuard(UserList);