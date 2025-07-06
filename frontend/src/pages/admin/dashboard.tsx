import React from 'react';
import Link from 'next/link';
import withAdminGuard from '../../utils/withAdminGuard';

function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Quản trị hệ thống xác thực</h1>
        <button onClick={handleLogout} className="mb-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition font-semibold">Đăng xuất</button>
        <ul className="w-full flex flex-col gap-4">
          <li>
            <Link href="/admin/user-list" legacyBehavior>
              <a className="block w-full py-2 px-4 rounded bg-orange-500 text-white font-semibold text-center hover:bg-orange-600 transition">Quản lý người dùng</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/logs" legacyBehavior>
              <a className="block w-full py-2 px-4 rounded border border-orange-500 text-orange-500 font-semibold text-center hover:bg-orange-50 transition">Xem lịch sử đăng nhập</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withAdminGuard(AdminDashboard);