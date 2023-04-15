import Head from 'next/head'
import { Contact, OrderSuccessPopup } from '@/ksh-components'
import { useContext } from 'react'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'

export default function ContactPage() {
  const { showOrderSuccessPopup } = useContext(CartStates)
  return (
    <>
      <Head>
        <title>Contact - Pharmacie </title>
      </Head>
      <AnimatePresence>{showOrderSuccessPopup && <OrderSuccessPopup />}</AnimatePresence>
      <Contact />
    </>
  )
}
