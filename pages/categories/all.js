import ProductCardContainer from '@/ksh-containers/ProductCardContainer'
import { ProductCard, SearchBar, ProductFilter, OrderSuccessPopup, Button } from '@/ksh-components'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
import { API_URL } from '@/ksh-config/index'
import { changeMyanNum } from '@/ksh-helpers'
import { useContext } from 'react'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'
import { useLoadMore } from '@/ksh-hooks'
import { ImSpinner9 } from 'react-icons/im'
import styled from 'styled-components'

const LoadingSpinner = styled(ImSpinner9)`
  margin-left: 0.5em;
  transform: translateY(0.15em) rotate(0deg);
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: translateY(0.15em) rotate(0deg);
    }
    to {
      transform: translateY(0.15em) rotate(360deg);
    }
  }
`

export default function AllMedicinePage({ medicines, category, longCat, totalCount }) {
  const { showOrderSuccessPopup } = useContext(CartStates)
  const { loadedMedicines, loading, loadMoreMedicines, CURRENT_ITEMS_COUNT } = useLoadMore(medicines)

  return (
    <>
      {/* <button
        onClick={() => {
          fetch('http://localhost:3000/api/updateMedicinesAmount', {
            method: 'PUT',
          })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

          fetch('https://ksh-backend.herokuapp.com/medicines', {
            headers: {
              Authorization:
                'Bearer',
            },
          })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

          fetch('https://ksh-backend.herokuapp.com/auth/local', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: 'yaunghein@gmail.com', password: 'yaunghein' }),
          })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }}>
        Click Me
      </button> */}
      <AnimatePresence>{showOrderSuccessPopup && <OrderSuccessPopup />}</AnimatePresence>
      <GlobalContainer padding='6.25em 7.81em 4.4em 7.81em'>
        <SearchBar.Container>
          <SearchBar />
          <ProductFilter longCat={longCat} />
        </SearchBar.Container>

        <ProductCard.InfoBar>
          <ProductCard.CategoryName>{category}</ProductCard.CategoryName>
          <ProductCard.Count>
            ရလဒ်ပေါင်း <span className='mm-number'>{changeMyanNum(totalCount)}</span>
          </ProductCard.Count>
        </ProductCard.InfoBar>
      </GlobalContainer>
      <ProductCardContainer medicines={loadedMedicines} />
      {totalCount !== CURRENT_ITEMS_COUNT && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0 5.6em 0',
            marginLeft: '-1em',
          }}>
          <Button.OffWhite
            onClick={loadMoreMedicines}
            style={{ background: loading && '#5ABEAE', color: loading && '#FFFFFF' }}>
            {loading ? (
              <>
                ခဏစောင့်ပါ <LoadingSpinner />
              </>
            ) : (
              'ဆေးတွေထပ်ပြပါ'
            )}
          </Button.OffWhite>
        </div>
      )}
    </>
  )
}

export async function getStaticProps() {
  const resp = await fetch(`${API_URL}/medicines?_sort=published_at:DESC&_start=0&_limit=4`)
  const medicines = await resp.json()

  const respCat = await fetch(`${API_URL}/categories`)
  const longCat = await respCat.json()

  const totalCountResp = await fetch(`${API_URL}/medicines/count`)
  const totalCount = await totalCountResp.json()

  return {
    props: {
      medicines,
      category: 'ဆေးအားလုံး',
      longCat: longCat,
      totalCount,
    },
    // revalidate: 5,
  }
}
