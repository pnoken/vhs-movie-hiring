import Head from "next/head";
import Link from "next/link";

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css"
          integrity="sha384-wESLQ85D6gbsF459vf1CiZ2+rr+CsxRY0RpiF1tLlQpDnAgg6rwdsUF1+Ics2bni"
          crossorigin="anonymous"
        ></link>
      </Head>
      <body>
        <nav className="navbar navbar-dark bg-dark">
          <Link href="/">
            <a className="text-light">VHS Movie Hiring</a>
          </Link>
        </nav>
        {children}
      </body>
    </div>
  );
}
