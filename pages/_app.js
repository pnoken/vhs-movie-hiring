import '../styles/globals.css';
import { StoreProvider } from '../contextStore';
import { ModalCtxProvider } from '../contextStore/modalCtx';

function MyApp({ Component, pageProps }) {
  return (
    <ModalCtxProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ModalCtxProvider>
  );
}

export default MyApp;
