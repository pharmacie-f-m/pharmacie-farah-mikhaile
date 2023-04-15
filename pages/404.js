import Head from "next/head";
import { Error } from "@/ksh-components";
import { useContext } from "react";
import { CartStates } from "@/ksh-contexts/Cart-Context";
import { OrderSuccessPopup } from "@/ksh-components";
import { AnimatePresence } from "framer-motion";

export default function NotFoundPage() {
  const { showOrderSuccessPopup } = useContext(CartStates);
  return (
    <>
      <Head>
        <title>404 - Pharmacie - Pharmacy in Spain</title>
      </Head>
      <AnimatePresence>
        {showOrderSuccessPopup && <OrderSuccessPopup />}
      </AnimatePresence>
      <Error
        message="This page is not on our website"
        status="Error : 404 Page Not Found"
      />
    </>
  );
}
