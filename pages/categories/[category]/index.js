import Head from 'next/head'
import { useRouter } from 'next/router'
import ProductCardContainer from '@/ksh-containers/ProductCardContainer'
import { ProductCard, SearchBar, ProductFilter, OrderSuccessPopup, Empty } from '@/ksh-components'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
import { API_URL } from '@/ksh-config/index'
import { changeMyanNum } from '@/ksh-helpers'
import { useContext, useState, useEffect } from 'react'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'

export default function AllMedicinePage({ medicines, count, category, longCat }) {
  const router = useRouter()
  const { showOrderSuccessPopup, setShowOrderSuccessPopup } = useContext(CartStates)

  return (
      <>
        <Head>
          <title>Categories - Pharmacie - Pharmacy in Spain</title>
        </Head>
        <AnimatePresence>{showOrderSuccessPopup && <OrderSuccessPopup />}</AnimatePresence>

        <GlobalContainer padding='6.25em 7.81em 4.4em 7.81em'>
          <SearchBar.Container>
            <SearchBar />
            <ProductFilter longCat={longCat} routerCat={router.query.category} />
          </SearchBar.Container>

          <ProductCard.InfoBar>
            <ProductCard.CategoryName>{category}</ProductCard.CategoryName>
            <ProductCard.Count>
              ရလဒ်ပေါင်း <span className='mm-number'>{changeMyanNum(count)}</span>
            </ProductCard.Count>
          </ProductCard.InfoBar>
        </GlobalContainer>
        {medicines && medicines.length > 0 ? (
            <ProductCardContainer medicines={medicines} />
        ) : (
            <Empty message={`${category} Nothing`} />
        )}
      </>
  )
}

export async function getStaticPaths() {
  try {
    const resp = await fetch(`${API_URL}/categories`);
    const categories = await resp.json();
    const paths = categories.map((category) => {
      return {
        params: {
          category: category.slug,
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error while fetching categories data:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}



export async function getStaticProps({ params: { category } }) {

  try {
    const REQUESTS = [
      fetch(`${API_URL}/medicines?categories.slug_contains=${category}`),
      fetch(`${API_URL}/categories?slug=${category}`),
      fetch(`${API_URL}/categories`),
    ]
    const [medicinesResp, singleCategoryResp, respCat] = await Promise.all(REQUESTS)
    const categoryData = await medicinesResp.json()
    const singleCategory = await singleCategoryResp.json()
    const longCat = await respCat.json()

    const isCategoryInCMS = longCat.some(cat => cat.slug === category)

    if (!isCategoryInCMS) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        medicines: categoryData,
        count: categoryData.length,
        // I dont know why this check for singleCategory[0] is needed, but to fix the error in console :((
        category: singleCategory[0] ? singleCategory[0].category_name:'',
        longCat,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error while fetching category "${category}" data:', error)
    return {
      notFound: true,
    }
  }
}