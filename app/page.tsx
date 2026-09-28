import Link from 'next/link'
import { rooms } from '@/lib/data'

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium text-blue-100">
              رزرو هوشمند اتاق‌ها
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                رزرو اتاق، سفارش غذا و پرداخت سریع در یک تجربه یکپارچه
              </h1>
              <p className="max-w-xl text-base text-slate-200 sm:text-lg">
                با سیستم رزرو هتل ما هزینه هر شب را بر اساس مدت اقامت محاسبه می‌کنیم، صبحانه، ناهار و شام را به‌صورت اختیاری اضافه می‌کنیم و فاکتور به‌صورت خودکار محاسبه می‌شود.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/bookings" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
                رزرو اتاق
              </Link>
              <Link href="/admin" className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                مشاهده داشبورد مدیر
              </Link>
            </div>
            <div className="grid max-w-lg grid-cols-3 gap-4 pt-4 text-center">
              <div>
                <p className="text-3xl font-black">24/7</p>
                <p className="text-sm text-slate-300">پشتیبانی</p>
              </div>
              <div>
                <p className="text-3xl font-black">{rooms.length}</p>
                <p className="text-sm text-slate-300">اتاق فعال</p>
              </div>
              <div>
                <p className="text-3xl font-black">3</p>
                <p className="text-sm text-slate-300">نوع وعده غذا</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-sm">
            <div className="rounded-2xl bg-white p-5 text-slate-800 shadow-lg">
              <p className="mb-4 text-sm font-semibold text-slate-500">محاسبه سریع قیمت</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
                  <span>اتاق استاندارد</span>
                  <span className="font-bold">۶۰۰,۰۰۰ تومان</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
                  <span>صبحانه</span>
                  <span className="font-bold">۱۵۰,۰۰۰ تومان</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
                  <span>ناهار و شام</span>
                  <span className="font-bold">۲۲۰,۰۰۰ تومان</span>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-right">
                  <p className="text-sm text-slate-500">مجموع تقریبی</p>
                  <p className="text-2xl font-black text-blue-700">۹۷۰,۰۰۰ تومان</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">اتاق‌های ما</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">انتخاب بهترین گزینه برای اقامت</h2>
          </div>
          <Link href="/bookings" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            مشاهده همه →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <div key={room.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
              <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-100 p-6">
                <div className="flex h-full items-end justify-between rounded-2xl bg-slate-800/85 p-4 text-white">
                  <div>
                    <p className="text-xs text-slate-300">{room.capacity} نفر</p>
                    <p className="text-xl font-black">{room.name}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-200">
                    {room.availability}
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-sm leading-7 text-slate-600">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-xs text-slate-500">از هر شب</p>
                    <p className="text-2xl font-black text-slate-900">{room.pricePerNight.toLocaleString('fa-IR')} تومان</p>
                  </div>
                  <Link href="/bookings" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500">
                    رزرو
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
