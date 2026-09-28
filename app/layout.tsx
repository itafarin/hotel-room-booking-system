import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hotel Booking System',
  description: 'A hotel room booking and invoice management system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-slate-50 text-slate-800 antialiased">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
              RoyalStay
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/" className="transition hover:text-slate-900">
                خانه
              </Link>
              <Link href="/bookings" className="transition hover:text-slate-900">
                رزرو اتاق
              </Link>
              <Link href="/admin" className="transition hover:text-slate-900">
                پنل مدیر
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
