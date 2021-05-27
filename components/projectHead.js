import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';

export default function ProjectHead({ title }) {
  return (
    //Head Section
    <Head>
      <title>{title || 'VHS Movie Hiring'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/assets/images/logo.png" />
    </Head>
  );
}
