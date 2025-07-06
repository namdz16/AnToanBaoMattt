import Link from 'next/link';
import React from 'react';

const AuthActions: React.FC = () => {
  return (
    <div className="flex gap-4 mb-4">
      <Link href="/">
        <span className="text-blue-600 hover:underline cursor-pointer">Đăng nhập</span>
      </Link>
      <Link href="/register">
        <span className="text-blue-600 hover:underline cursor-pointer">Đăng ký</span>
      </Link>
      <Link href="/change-password">
        <span className="text-blue-600 hover:underline cursor-pointer">Đổi mật khẩu</span>
      </Link>
    </div>
  );
};

export default AuthActions;