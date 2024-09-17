// src/pages/_app.tsx
import { CartProvider } from "@/context/CartContext";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} className="font-poppins" />
    </CartProvider>
  );
}

export default MyApp;
