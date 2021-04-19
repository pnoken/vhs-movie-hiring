import Head from "next/head";

export default function UserLayout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <body>
        <nav classNameName="navbar navbar-dark bg-dark"></nav>
        <h1>VHS Movie Hiring</h1>
        {children}
      </body>
    </div>
  );
}
