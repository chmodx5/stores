import { SessionProvider } from "next-auth/react";
import "./styles.css";
import { StoreProvider } from "../store/storeContext";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>
    </SessionProvider>
  );
}
