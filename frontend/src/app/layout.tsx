// Frontend layout الرئيسي
import type { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'Quant Master V2',
  description: 'منصة احترافية لتدريب القسم الكمي من اختبار القدرات',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
