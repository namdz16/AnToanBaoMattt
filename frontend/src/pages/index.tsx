import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Secure Auth System</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
          <h1 className="text-3xl font-bold text-orange-500 mb-4">Secure Auth System</h1>
          <p className="text-gray-600 mb-8 text-center">Hệ thống xác thực an toàn.<br/>Chào mừng bạn đến với nền tảng bảo mật!</p>
          <div className="w-full flex flex-col gap-4">
            <a href="/login" className="w-full py-2 px-4 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">Đăng nhập</a>
            <a href="/register" className="w-full py-2 px-4 rounded border border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 transition">Đăng ký</a>
          </div>
        </div>
        <footer className="mt-10 text-gray-400 text-sm">© 2025 Secure Auth System</footer>
      </main>
    </>
  );
}