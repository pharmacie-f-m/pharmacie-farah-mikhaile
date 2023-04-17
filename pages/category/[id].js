import Head from 'next/head'
import { Contact, OrderSuccessPopup } from '@/ksh-components'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'

export default function ProductsByCategory() {
    const { showOrderSuccessPopup } = useContext(CartStates);
    const router = useRouter();
    const id  = router.query.id;
    console.log(id);

    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:80/pharmacie/get-category-info.php?categoryId=" + id)
            .then(response => response.json())
            .then(categoryData=>{
                console.log(categoryData); // log the data to check that it's not empty
                setCategoryData(categoryData);
            })
            .catch(console.error);
    }, []);

    const [categoriesData, setCategoriesData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:80/pharmacie/get-categories.php")
            .then(response => response.json())
            .then(categoriesData=>{
                console.log(categoriesData); // log the data to check that it's not empty
                setCategoriesData(categoriesData);
            })
            .catch(console.error);
    }, []);

    const [productData, setProductData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:80/pharmacie/get-products-by-category.php?categoryId=' + id)
            .then(response => response.json())
            .then(productData=>{
                console.log(productData); // log the data to check that it's not empty
                setProductData(productData);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>

            <br />
            <h1 className={"center-text"}>Medicine</h1><br/><br />
            <nav id={"products-nav-div"}>
                {categoriesData.map(category => (
                    <Link href={`/category/${category.categoryId}`} passHref className={"products-nav-link"}>{category.categoryName}</Link>
                ))}
            </nav>
            <br />
            <br />

            {categoryData.map(category => (
                <h3 key={category.categoryId} className={"center-text"}>{category.categoryName}</h3>
            ))}
            <br/>
            <div id={"products-grid"}>
                {productData.map(product => (
                    <div key={product.productId} className={"products-grid-item"}>
                        <Link href={`/product/${product.productId}`} passHref className={"center-text"}><h4>{product.productName}</h4></Link><br />
                        <Link href={`/product/${product.productId}`} passHref>
                            <Image
                                src={"/images/" + product.img_name}
                                alt={product.productName}
                                className={"center-image product-grid-item-image"}
                                height={"250"}
                                width={"250"}
                            />
                        </Link>

                    </div>
                ))}
            </div>
        </>
    )
}
