import { ModalProvider } from '@/components/providers/modal-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Team Chat',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            font.className,
            'bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 antialiased'
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
            disableTransitionOnChange>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
