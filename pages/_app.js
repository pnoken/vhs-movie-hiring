import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';
// import '../components/topup/TopUp.css';
//Not aproppriate to put css inside components folder. There is a default style directory for holding css
// And please try to use scoped css for the topup, cos it is affecting other css classes on the admin page
// That's why I commented it out

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
