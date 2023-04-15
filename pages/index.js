import JumbotronContainer from '@/ksh-containers/JumbotronContainer'
import CategoryCardContainer from '@/ksh-containers/CategoryCardContainer'
import TestimonialContainer from '@/ksh-containers/TestimonialContainer'
import { CtaSection, OrderSuccessPopup } from '@/ksh-components'
import BannerContainer from '@/ksh-containers/BannerContainer'
import { API_URL } from '@/ksh-config/index'
import { useContext } from 'react'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'

export default function HomePage({ testimonials = [], categories = [] }) {
    const { showOrderSuccessPopup } = useContext(CartStates)
    return (
        <>
            <AnimatePresence>{showOrderSuccessPopup && <OrderSuccessPopup />}</AnimatePresence>
            <BannerContainer />
            <CategoryCardContainer categories={categories} />
            <JumbotronContainer />
            <TestimonialContainer testimonials={testimonials} />
            <CtaSection />
        </>
    )
}

export async function getStaticProps() {
    let testimonials = []
    let categories = []

    try {
        const testimonialsResp = await fetch(`${API_URL}/testimonials`)
        testimonials = await testimonialsResp.json()

        const categoriesResp = await fetch(`${API_URL}/categories`)
        categories = await categoriesResp.json()
    } catch (error) {
        console.error(error)
    }

    return {
        props: { testimonials, categories },
        revalidate: 1,
    }
}
