// src/pages/_app.tsx
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} className="font-poppins" />;
}

export default MyApp;
