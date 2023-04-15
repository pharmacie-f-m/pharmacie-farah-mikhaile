import Head from "next/head";
import { useRouter } from "next/router";
import { API_URL } from "@/ksh-config/index";
import ProductCardContainer from "@/ksh-containers/ProductCardContainer";
import {
  ProductCard,
  SearchBar,
  ProductFilter,
  Empty,
  OrderSuccessPopup,
} from "@/ksh-components";
import { GlobalContainer } from "@/ksh-styles/GlobalStyles";
import { changeMyanNum } from "@/ksh-helpers";
const { Alphabets } = require("@/ksh-data/alphabets.json");
import { useContext } from "react";
import { CartStates } from "@/ksh-contexts/Cart-Context";
import { AnimatePresence } from "framer-motion";

export default function CharacterPage({
  filteredMedicines,
  count,
  char,
  longCat,
}) {
  const router = useRouter();
  const { showOrderSuccessPopup } = useContext(CartStates);

  return (
    <>
      <Head>
        <title>{`"${char}"`} - Pharmacie - Pharmacy in Spain</title>
      </Head>
      <AnimatePresence>
        {showOrderSuccessPopup && <OrderSuccessPopup />}
      </AnimatePresence>

      <GlobalContainer>
        <SearchBar.Container>
          <SearchBar />
          <ProductFilter longCat={longCat} routerChar={router.query.char} />
        </SearchBar.Container>

        <ProductCard.InfoBar>
          <ProductCard.CategoryName>{`Medicine that starts with "${char}" `}</ProductCard.CategoryName>
          <ProductCard.Count>
            Results: <span className="mm-number">{changeMyanNum(count)}</span>
          </ProductCard.Count>
        </ProductCard.InfoBar>
      </GlobalContainer>

      {filteredMedicines.length > 0 ? (
        <ProductCardContainer medicines={filteredMedicines} />
      ) : (
        <Empty message={`"${char}" There are no drugs yet`} />
      )}
    </>
  );
}

export function getStaticPaths() {
  const paths = Alphabets.map((chararacter) => {
    return {
      params: {
        char: chararacter.char,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { char } }) {
  try {
    const resp = await fetch(`${API_URL}/medicines`);
    const medicines = await resp.json();
    const filteredMedicines = medicines.filter(
        (medicine) => medicine.product_name_eng.split("")[0].toLowerCase() === char
    );
    const respCat = await fetch(`${API_URL}/categories`);
    const longCat = await respCat.json();

    return {
      props: {
        filteredMedicines,
        count: filteredMedicines.length,
        char,
        longCat,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        filteredMedicines: [],
        count: 0,
        char,
        longCat: [],
      },
      revalidate: 5,
    };
  }
}