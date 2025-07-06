import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAdminGuard(WrappedComponent: any) {
  return function GuardedComponent(props: any) {
    const router = useRouter();
    useEffect(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      if (!token) {
        router.replace('/admin/login');
      }
    }, [router]);
    return <WrappedComponent {...props} />;
  };
}
