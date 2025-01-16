import Navbar from '@/components/Navbar';
import { theme } from '@/configs/theme';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Modelite',
  description:
    'Modelite is a premier e-commerce platform specializing in high-quality, stylish shoes. Our mission is to provide customers with a seamless shopping experience, offering a wide range of footwear options that cater to various tastes and preferences. With a focus on both fashion and comfort, Modelite ensures that every pair of shoes meets the highest standards of craftsmanship. Explore our collection and step into a world of elegance and sophistication.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='th' className={`${poppins.variable} bg-white`}>
      <ConfigProvider theme={theme}>
        <AntdRegistry>
          <body className={`min-h-scree text-black antialiased`}>
            <Navbar />
            <main className='container mx-auto max-w-[1800px]'>{children}</main>
          </body>
        </AntdRegistry>
      </ConfigProvider>
    </html>
  );
}
