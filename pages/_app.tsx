import AppLayout from '../components/AppLayout';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
	return (
		<AppLayout>
			<Component {...pageProps} />
		</AppLayout>
	);
}

export default MyApp;
