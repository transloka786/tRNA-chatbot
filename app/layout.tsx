import '../styles/globals.css';

export const metadata = {
  title: 'Ask KritRNA',
  description: 'Get answers about our technology, research, or partnership opportunities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
