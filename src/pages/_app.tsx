// src/pages/_app.tsx
import "../styles/globals.css"; // Adjust the path if needed

type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
