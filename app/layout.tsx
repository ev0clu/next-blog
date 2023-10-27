import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeContextProvider } from './context/ThemeContext';
import ThemeProvider from './providers/ThemeProvider';
import AuthProvider from './providers/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Blog App',
  description: 'Basic blog app created with Next.js'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="flex min-h-screen flex-col px-6 pb-2 pt-5">
                <Header />
                {children}
                <Footer />
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
