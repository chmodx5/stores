import { SessionProvider } from "next-auth/react";
import "./styles.css";
import { StoreProvider } from "../store/storeContext";
import { UserProvider } from "../store/userContext";
import { AppUiProvider } from "../store/appUiContext";
import { AppWrapper } from "../components/layouts";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <AppUiProvider>
        <UserProvider>
          <StoreProvider>
            <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
          </StoreProvider>
        </UserProvider>
      </AppUiProvider>
    </SessionProvider>
  );
}
