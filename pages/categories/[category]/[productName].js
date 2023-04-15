import Head from "next/head";
import { ProductDetails } from "@/ksh-layouts";
import {
  ImageShowcase,
  ProductCard,
  OrderSuccessPopup,
  Error,
  Empty,
} from "@/ksh-components";
import ProductDetailsInfoContainer from "@/ksh-containers/ProductDetailsInfoContainer";
import { API_URL } from "@/ksh-config/index";
import { GlobalContainer } from "@/ksh-styles/GlobalStyles";
import { useContext } from "react";
import { CartStates } from "@/ksh-contexts/Cart-Context";
import { AnimatePresence } from "framer-motion";

export default function ProductDetailsPage({
  isInjected = false,
  medicine_images,
  medicine_details,
  medicine_info,
  relatedMedicines,
}) {
  const { showOrderSuccessPopup } = useContext(CartStates);

  if (isInjected) {
    return (
      <Error
        message="URL"
        status="Error : tgg pan pr dl, plz."
      />
    );
  }
  return (
    <>
      <Head>
        <title>
          {" "}
          {medicine_info.product_name_eng} - Pharmacie - Pharmacy in Spain
        </title>
      </Head>
      <AnimatePresence>
        {showOrderSuccessPopup && <OrderSuccessPopup />}
      </AnimatePresence>
      {/* <OrderSuccessPopup /> */}
      <ProductDetails>
        <ProductDetails.StickySide>
          <ImageShowcase medicine_images={medicine_images} />
        </ProductDetails.StickySide>
        <ProductDetails.NormalSide>
          <ProductDetailsInfoContainer
            medicine_details={medicine_details}
            medicine_info={medicine_info}
          />
        </ProductDetails.NormalSide>
      </ProductDetails>

      {relatedMedicines.length > 0 ? (
        <GlobalContainer style={{ marginTop: "-2.25em" }}>
          <ProductCard.Heading>Related Drugs</ProductCard.Heading>
          <ProductCard.Frame>
            {relatedMedicines.map((medicine) => (
              <ProductCard key={medicine.id} medicine={medicine} />
            ))}
          </ProductCard.Frame>
        </GlobalContainer>
      ) : (
        <Empty message="No drugs yet" />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const resp = await fetch(`${API_URL}/medicines`);
  const medicines = await resp.json();
  const paths = medicines.reduce((acc, medicine) => {
    if (medicine.categories.length > 0) {
      const path = {
        params: {
          category: medicine.categories[0].slug,
          productName: medicine.slug,
        },
      };
      acc.push(path);
    }
    return acc;
  }, []);

  return {
    paths,
    fallback: "blocking",
  };
}


export async function getStaticProps({ params: { productName, category } }) {
  const resp = await fetch(`${API_URL}/medicines?slug=${productName}`);
  const medicine = await resp.json();

  const relatedMedicinesResp = await fetch(
    `${API_URL}/medicines?categories.slug_contains=${category}`
  );
  const relatedMedicines = await relatedMedicinesResp.json();

  const isMedicineInCMS = relatedMedicines.some(
    (medicine) => medicine.slug === productName
  );

  if (!isMedicineInCMS) {
    return {
      props: {
        isInjected: true,
      },
    };
  }

  return {
    props: {
      medicine_images: medicine[0] ? medicine[0].product_images : null,
      medicine_details: medicine[0] ? medicine[0].product_details : null,
      medicine_info: medicine[0] ? medicine[0] : "null",
      relatedMedicines: relatedMedicines.filter(
        (medicine) => medicine.slug !== productName
      ),
    },
    revalidate: 5,
  };
}
