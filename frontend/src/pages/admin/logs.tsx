import withAdminGuard from '../../utils/withAdminGuard';
import { gql, useQuery } from '@apollo/client';

const GET_LOGS = gql`query { getLoginLogs }`;

function Logs() {
  const { data, loading, error } = useQuery(GET_LOGS);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-orange-200 bg-white flex flex-col items-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Lịch sử đăng nhập</h2>
        {loading && <div className="text-gray-500">Đang tải dữ liệu...</div>}
        {error && <div className="text-red-500">Lỗi: {error.message}</div>}
        <ul className="w-full flex flex-col gap-3">
          {data?.getLoginLogs && data.getLoginLogs.length > 0 ? (
            data.getLoginLogs.map((log: string, idx: number) => (
              <li key={idx} className="flex items-center justify-between bg-orange-50 rounded px-4 py-2 border border-orange-100 text-gray-700">
                {log}
              </li>
            ))
          ) : (
            !loading && <li className="text-gray-500 text-center w-full">Không có log nào.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default withAdminGuard(Logs);