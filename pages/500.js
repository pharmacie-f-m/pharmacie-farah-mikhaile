import Head from "next/head";
import { Error } from "@/ksh-components";
import { useContext } from "react";
import { CartStates } from "@/ksh-contexts/Cart-Context";
import { OrderSuccessPopup } from "@/ksh-components";
import { AnimatePresence } from "framer-motion";

export default function ServerErrorPage() {
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
        message="Server Error"
        status="Error : 500 Internal Server Error"
      />
    </>
  );
}
