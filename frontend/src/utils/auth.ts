// Lưu token vào localStorage
export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

// Lấy token từ localStorage
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

// Xóa token khi đăng xuất
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

// Kiểm tra đã đăng nhập chưa
export function isAuthenticated(): boolean {
  return !!getToken();
}