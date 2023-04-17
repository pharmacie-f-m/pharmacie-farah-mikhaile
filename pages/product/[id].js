import Head from 'next/head'
import { Contact, OrderSuccessPopup } from '@/ksh-components'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { AnimatePresence } from 'framer-motion'

export default function ProductsByCategory() {
    const { showOrderSuccessPopup } = useContext(CartStates);
    const router = useRouter();
    const id  = router.query.id;
    console.log(id);

    const [productData, setProductData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:80/pharmacie/get-product-info.php?productId=' + id)
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
                <title>Product</title>
            </Head>
            <div id={"product-div"}>
                {productData.map(product => (
                    <div key={product.productId}>
                        <h1 className={"center-text"}>{product.productName}</h1><br/>
                        <div className={"flex"}>
                            <div id={"product-flex-left"}>
                                <Image
                                    src={"/images/" + product.img_name}
                                    alt={product.productName}
                                    className={"center-image"}
                                    height={"400"}
                                    width={"400"}
                                />
                            </div>
                            <div id={"product-flex-right"}>
                                <h3>Price</h3>
                                <p>{product.price} €</p>
                                <br />

                                <h3>Ingredients</h3>
                                <p className={"justify-text"}>{product.ingredients}</p>
                                <br />

                                <h3>Description</h3>
                                <article className={"justify-text"}>
                                    {product.description}
                                </article>
                            </div>

                        </div>


                    </div>
                ))}
            </div>
        </>
    )
}
