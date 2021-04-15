import React from 'react'
import Head from 'next/head'
import Link from 'next/link';


const index = () => {
    return (
        <div>
            <Head>
                <title>
                    vhsVirtual Payment
                </title>
                
            </Head>
            <div>
                <Link href="cart">
                        Cart
                </Link>
            </div>
        </div>
    )
}

export default index
