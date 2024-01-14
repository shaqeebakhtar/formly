import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Formly',
  description: 'Create interactive forms for your surveys and feedbacks',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
