import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import AuthActions from '../components/user/AuthActions';

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($username: String!, $oldPassword: String!, $newPassword: String!) {
    changePassword(username: $username, oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export default function ChangePasswordPage() {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassword, { data, error }] = useMutation(CHANGE_PASSWORD);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword({ variables: { username, oldPassword, newPassword } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input value={username} onChange={e => setUsername((e.target as HTMLInputElement).value)} placeholder="Username" className="border p-2 rounded focus:ring-2 focus:ring-orange-400" />
          <input value={oldPassword} onChange={e => setOldPassword((e.target as HTMLInputElement).value)} type="password" placeholder="Old Password" className="border p-2 rounded focus:ring-2 focus:ring-orange-400" />
          <input value={newPassword} onChange={e => setNewPassword((e.target as HTMLInputElement).value)} type="password" placeholder="New Password" className="border p-2 rounded focus:ring-2 focus:ring-orange-400" />
          <button type="submit" className="w-full py-2 px-4 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">Đổi mật khẩu</button>
          {data && <div className="text-green-600 text-sm">{data.changePassword}</div>}
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <span>Quay lại <a href="/login" className="text-orange-500 hover:underline">Đăng nhập</a></span>
          <span>Chưa có tài khoản? <a href="/register" className="text-orange-500 hover:underline">Đăng ký</a></span>
        </div>
      </div>
    </div>
  );
}