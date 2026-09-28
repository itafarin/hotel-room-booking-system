'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { CheckCircle2, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [invoice, setInvoice] = useState<any>(null)

  const booking = useMemo(() => {
    const quote = searchParams.get('quote')
    if (!quote) return null
    try {
      return JSON.parse(decodeURIComponent(quote))
    } catch {
      return null
    }
  }, [searchParams])

  const handlePayment = async () => {
    if (!booking) return

    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })

      const result = await response.json()
      setInvoice(result)
    } finally {
      setLoading(false)
    }
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-black text-slate-900">داده رزرو پیدا نشد</h1>
        <p className="mt-4 text-slate-600">لطفاً از فرم رزرو دوباره اقدام کنید.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h1 className="text-2xl font-black text-slate-900">نمایش خلاصه رزرو</h1>

          <div className="mt-6 space-y-5 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span>اتاق</span>
              <strong>{booking.roomName}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span>تاریخ ورود</span>
              <strong>{booking.checkIn}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span>تاریخ خروج</span>
              <strong>{booking.checkOut}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span>تعداد شب</span>
              <strong>{booking.nights}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span>غذاهای انتخاب‌شده</span>
              <strong>{booking.meals?.join('، ') || 'بدون وعده غذایی'}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-soft">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
            <CreditCard size={18} />
            پرداخت
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span>هزینه اتاق</span>
              <strong>{booking.roomCost.toLocaleString('fa-IR')} تومان</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>هزینه غذا</span>
              <strong>{booking.mealCost.toLocaleString('fa-IR')} تومان</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>مالیات</span>
              <strong>{booking.tax.toLocaleString('fa-IR')} تومان</strong>
            </div>
            <div className="my-3 h-px bg-slate-700" />
            <div className="flex items-center justify-between text-lg font-black text-white">
              <span>مجموع</span>
              <span>{booking.grandTotal.toLocaleString('fa-IR')} تومان</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'در حال انتقال به درگاه...' : 'پرداخت و صدور فاکتور'}
          </button>
        </div>
      </div>

      {invoice && (
        <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-soft">
          <div className="flex items-center gap-3 text-emerald-700">
            <CheckCircle2 size={22} />
            <h2 className="text-xl font-black">فاکتور با موفقیت صادر شد</h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">شماره فاکتور</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{invoice.invoiceId}</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">تاریخ صدور</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{invoice.issuedAt}</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">وضعیت پرداخت</p>
              <p className="mt-2 text-2xl font-black text-emerald-600">{invoice.paymentStatus}</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">جمع نهایی</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{invoice.total.toLocaleString('fa-IR')} تومان</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
