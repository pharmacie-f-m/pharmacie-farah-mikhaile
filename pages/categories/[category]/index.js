import { useRouter } from 'next/router'
import ProductCardContainer from '@/ksh-containers/ProductCardContainer'
import { ProductCard, SearchBar, ProductFilter } from '@/ksh-components'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
import { API_URL } from '@/ksh-config/index'
import { changeMyanNum } from '@/ksh-helpers'

export default function AllMedicinePage({ medicines, count, category, longCat}) {
  const router = useRouter();
  console.log(router.query.category)
  return (
    <>
      <GlobalContainer>
        <SearchBar.Container>
          <SearchBar />
          <ProductFilter longCat = {longCat} routerCat = {router.query.category} />
        </SearchBar.Container>

        <ProductCard.InfoBar>
          <ProductCard.CategoryName>{category}</ProductCard.CategoryName>
          <ProductCard.Count>
            ရလဒ်ပေါင်း <span className='mm-number'>{changeMyanNum(count)}</span>
          </ProductCard.Count>
        </ProductCard.InfoBar>
      </GlobalContainer>

      <ProductCardContainer medicines={medicines} />
    </>
  )
}

export async function getStaticPaths() {
  const resp = await fetch(`${API_URL}/categories`)
  const categories = await resp.json()
  const paths = categories.map(category => {
    return {
      params: {
        category: category.slug,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params: { category } }) {
  const REQUESTS = [
    fetch(`${API_URL}/medicines?categories.slug_contains=${category}`),
    fetch(`${API_URL}/categories?slug=${category}`),
    fetch(`${API_URL}/categories`)
  ]
  const [medicinesResp, singleCategoryResp, respCat] = await Promise.all(REQUESTS)
  const categoryData = await medicinesResp.json()
  const singleCategory = await singleCategoryResp.json()
  const longCat = await respCat.json();

  return {
    props: {
      medicines: categoryData,
      count: categoryData.length,
      // I dont know why this check for singleCategory[0] is needed, but to fix the error in console :((
      category: singleCategory[0] ? singleCategory[0].category_name_long : null,
      longCat : longCat
    },
  }
}



