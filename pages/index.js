import JumbotronContainer from '@/ksh-containers/JumbotronContainer'
import CategoryCardContainer from '@/ksh-containers/CategoryCardContainer'
import TestimonialContainer from '@/ksh-containers/TestimonialContainer'
import { CtaSection, OrderSuccessPopup } from '@/ksh-components'
import BannerContainer from '@/ksh-containers/BannerContainer'
import { API_URL } from '@/ksh-config/index'
import React, { useContext, useState, useEffect } from 'react'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'

export default function HomePage({ testimonials = [], categories = [] }) {
    const { showOrderSuccessPopup } = useContext(CartStates)

    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:80/pharmacie/get-categories.php")
            .then(response => response.json())
            .then(categoryData=>{
                console.log(categoryData); // log the data to check that it's not empty
                setCategoryData(categoryData);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <AnimatePresence>{showOrderSuccessPopup && <OrderSuccessPopup />}</AnimatePresence>
            <BannerContainer />
            <CategoryCardContainer categories={categoryData} />
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
        const testimonialsResp = await fetch(`${API_URL}/testimonials`);
        testimonials = await testimonialsResp.json();

        const categoriesResp = await fetch(`http://localhost:80/PharmacIE/get-categories.php`);
        categories = await categoriesResp.json();
        console.log(categories);
    } catch (error) {
        console.error(error)
    }

    return {
        props: { testimonials, categories },
        revalidate: 1,
    }
}
