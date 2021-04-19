import Head from 'next/head'


export default function UserLayout({ title, children}){

    return(
        <div>
            <Head>
                {title}
            </Head>
            <body>
                <h1>VHS Movie Hiring</h1>
                {children}
            </body>
        </div>
    )
}