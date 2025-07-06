import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { setToken } from '../utils/auth';
import { useRouter } from 'next/router';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, error, loading }] = useMutation(LOGIN);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ variables: { username, password } });
    if (res.data?.login) {
      setToken(res.data.login);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input value={username} onChange={e => setUsername((e.target as HTMLInputElement).value)} placeholder="Username" className="border p-2 rounded focus:ring-2 focus:ring-orange-400" />
          <input value={password} onChange={e => setPassword((e.target as HTMLInputElement).value)} type="password" placeholder="Password" className="border p-2 rounded focus:ring-2 focus:ring-orange-400" />
          <button type="submit" className="w-full py-2 px-4 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
          {data && <div className="text-green-600 text-sm">Đăng nhập thành công!</div>}
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <span>Chưa có tài khoản? <a href="/register" className="text-orange-500 hover:underline">Đăng ký</a></span>
          <span>Quên mật khẩu hoặc muốn đổi mật khẩu? <a href="/change-password" className="text-orange-500 hover:underline">Đổi mật khẩu</a></span>
        </div>
      </div>
    </div>
  );
}
