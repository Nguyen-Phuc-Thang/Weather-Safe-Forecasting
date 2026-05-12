import './globals.css';
import NavBar from '../components/NavBar';
import { SettingsProvider } from '@/context/SettingContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <NavBar />
          <main className="pt-24">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}
