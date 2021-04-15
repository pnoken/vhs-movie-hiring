import Head from 'next/head';

const AppHead = ({ pageTitle }): JSX.Element => {
	return (
		<Head>
			<title>{pageTitle}</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export default AppHead;
