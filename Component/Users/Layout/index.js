import Head from 'next/head'


export default function UserLayout({ title, children}){

    return(
        <div>
            <Head>
                {title}
            </Head>
            <body>
                <h1>This is the user layout</h1>
                {children}
            </body>
        </div>
    )
}