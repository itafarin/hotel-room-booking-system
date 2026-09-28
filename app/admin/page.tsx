import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold text-blue-600">داشبورد مدیر</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">گزارش‌گیری و مانیتورینگ خدمات</h1>
      </div>

      <AdminDashboard />
    </div>
  )
}
