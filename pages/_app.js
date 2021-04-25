import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import ModalContext from '../Contexts/ModalContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
	const [showModal, setShowModal] = useState(false);
	const closeModal = () => {
		setShowModal(false);
	};
	const modalValues = {
		show: showModal,
		setShow: setShowModal,
		close: closeModal,
	};

	return (
		<ModalContext.Provider value={modalValues}>
			<Component {...pageProps} />
		</ModalContext.Provider>
	);
}

export default MyApp;
