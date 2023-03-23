import { SessionProvider } from "next-auth/react";
import "./styles.css";
import { StoreProvider } from "./../store/storeContext";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>
    </SessionProvider>
  );
}
