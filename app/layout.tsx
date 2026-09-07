import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/navigation/BottomNav';

export const metadata: Metadata = {
  title: '1Fi - Smart Shopping & Credit on Mutual Funds',
  description: 'Shop today and pay later with zero-cost EMI plans on 1Fi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-200 min-h-screen flex justify-center items-start">
        {/* Mobile Viewport Container Shell */}
        <div className="w-full max-w-md min-h-screen bg-slate-50 shadow-2xl relative flex flex-col pb-24 border-x border-slate-200/60">
          <main className="flex-1 w-full">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
