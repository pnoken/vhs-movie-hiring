import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';
import "./../components/topup/TopUp.css";
import { StoreProvider } from '../contextStore';
import { ModalCtxProvider } from '../contextStore/modalCtx';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <ModalCtxProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ModalCtxProvider>
    </>
  );
}

export default MyApp;
