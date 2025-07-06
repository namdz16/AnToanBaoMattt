import { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';

const LOGIN_ADMIN = gql`
  mutation LoginAdmin($username: String!, $password: String!) {
    loginAdmin(username: $username, password: $password)
  }
`;

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loginAdmin, { loading }] = useMutation(LOGIN_ADMIN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginAdmin({ variables: { username, password } });
      if (data?.loginAdmin) {
        localStorage.setItem('admin_token', data.loginAdmin);
        // Kiểm tra lại token vừa lưu, nếu không có thì báo lỗi rõ ràng
        const checkToken = localStorage.getItem('admin_token');
        if (!checkToken) {
          setError('Không lưu được token. Hãy thử lại hoặc kiểm tra trình duyệt.');
          return;
        }
        router.push('/admin/dashboard');
      } else {
        setError('Đăng nhập thất bại: Không nhận được token');
      }
    } catch (err: any) {
      // Hiển thị lỗi chi tiết từ server nếu có
      setError(err?.graphQLErrors?.[0]?.message || err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Đăng nhập Admin</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            className="border p-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="border p-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {/* Hiển thị lỗi nếu có */}
          {error && (<div className="text-red-500 text-sm">{error}</div>)}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
