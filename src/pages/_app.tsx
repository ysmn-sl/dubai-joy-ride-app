// src/pages/_app.tsx
import { CartProvider } from "@/context/CartContext";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "@/components/Layout";
type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} className="font-poppins" />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
