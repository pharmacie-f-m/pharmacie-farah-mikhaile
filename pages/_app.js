import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar, MobileNav, Footer, MinimalFooter } from "@/ksh-components";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/ksh-theme/theme";
import { Cart } from "@/ksh-components";
import { CartProvider } from "@/ksh-contexts/Cart-Context";
import { GlobalStyles } from "@/ksh-styles/GlobalStyles";
import { AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let progressBarTimeout = null;
const startProgressBar = () => {
  clearTimeout(progressBarTimeout);
  progressBarTimeout = setTimeout(NProgress.start, 200);
};
const stopProgressBar = () => {
  clearTimeout(progressBarTimeout);
  NProgress.done();
};
Router.events.on("routeChangeStart", () => startProgressBar());
Router.events.on("routeChangeComplete", () => stopProgressBar());
Router.events.on("routeChangeError", () => stopProgressBar());
NProgress.configure({ showSpinner: false });

function MyKSHApp({ Component, pageProps }) {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pharmacie - Pharmacy in Spain</title>
        <meta
          name="description"
          content="Online Pharmacy in Madrid"
        />
        <link rel="shortcut icon" type="image/svg" href="/favicon.svg" />
        <meta
          property="og:title"
          content="Pharmacie"
        />
        <meta
          property="og:description"
          content="You can visit and buy the medicines you need at a low price, or you can place an order from this website"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/kyawsanhtoo-pharmacy/image/upload/v1641658224/og_image_322a08b56f.jpg"
        />
      </Head>

      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <CartProvider>
          <Navbar
            isMobileNavOpen={isMobileNavOpen}
            setIsMobileNavOpen={setIsMobileNavOpen}
          />
          <AnimatePresence>
            {isMobileNavOpen && (
              <MobileNav
                isMobileNavOpen={isMobileNavOpen}
                setIsMobileNavOpen={setIsMobileNavOpen}
              />
            )}
          </AnimatePresence>
          <Cart />
          <Component {...pageProps} />
          {router.pathname === "/contact" ? <MinimalFooter /> : <Footer />}
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default MyKSHApp;
