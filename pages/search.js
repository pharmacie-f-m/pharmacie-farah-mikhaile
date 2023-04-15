import Head from "next/head";
import ProductCardContainer from "@/ksh-containers/ProductCardContainer";
import {
  ProductCard,
  SearchBar,
  ProductFilter,
  OrderSuccessPopup,
  Empty,
} from "@/ksh-components";
import { GlobalContainer } from "@/ksh-styles/GlobalStyles";
import { API_URL } from "@/ksh-config/index";
import { changeMyanNum } from "@/ksh-helpers";
import { useContext } from "react";
import { CartStates } from "@/ksh-contexts/Cart-Context";
import { AnimatePresence } from "framer-motion";
import qs from "qs";

export default function AllMedicinePage({ medicines, keyword, longCat }) {
  const { showOrderSuccessPopup } = useContext(CartStates);

  return (
      <>
        <Head>
          <title>
            {" "}
            {`"${keyword}" Search results for `} - Pharmacie
          </title>
        </Head>
        <AnimatePresence>
          {showOrderSuccessPopup && <OrderSuccessPopup />}
        </AnimatePresence>

        <GlobalContainer padding="6.25em 7.81em 4.4em 7.81em">
          <SearchBar.Container>
            <SearchBar />
            <ProductFilter longCat={longCat} />
          </SearchBar.Container>

          <ProductCard.InfoBar>
            <ProductCard.CategoryName>{`"${keyword}" Search results for`}</ProductCard.CategoryName>
            <ProductCard.Count>
              Total results{" "}
              <span className="mm-number">{changeMyanNum(medicines.length)}</span>
            </ProductCard.Count>
          </ProductCard.InfoBar>
        </GlobalContainer>

        {medicines.length > 0 ? (
            <ProductCardContainer medicines={medicines} />
        ) : (
            <Empty message={`"${keyword}"  No medicine found.`}>
              <ul
                  style={{
                    padding: "0.7em 0 0.7em 1em",
                  }}
              >
                <li
                    style={{
                      margin: "0.3em 0",
                    }}
                >
                  Please check the correct spelling.
                </li>
                <li
                    style={{
                      margin: "0.3em 0",
                    }}
                >
                  <strong>&quot;I will filter&quot;</strong> After pressing the button?
                  Medicines according to disease or Either with the beginning letter
                  You can search.
                </li>
                <li
                    style={{
                      margin: "0.3em 0",
                    }}
                >
                  in the menu <strong>&quot;Medicine family&quot;</strong>{" "}
                  You can go back to the link.
                </li>
              </ul>
            </Empty>
        )}
      </>
  );
}

export async function getServerSideProps({ query: { keyword } }) {
  const queryString = qs.stringify({
    _where: {
      _or: [
        { product_name_eng_contains: keyword },
        { slug_contains: keyword },
        { product_name_mm_contains: keyword },
        { product_nicknames_contains: keyword },
      ],
    },
  });

  try {
    const resp = await fetch(`${API_URL}/medicines?${queryString}`);
    const medicines = await resp.json();

    const categoriesResp = await fetch(`${API_URL}/categories`);
    const longCat = await categoriesResp.json();

    return {
      props: { keyword, medicines, longCat },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { keyword, medicines: [], longCat: [] },
    };
  }
}