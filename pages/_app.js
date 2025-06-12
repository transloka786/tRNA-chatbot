// /pages/_app.js
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Add Poppins Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
      <style jsx global>{`
        html, body {
          font-family: 'Poppins', Arial, sans-serif !important;
        }
      `}</style>
    </>
  );
}
