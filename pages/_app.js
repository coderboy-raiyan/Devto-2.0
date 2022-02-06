import { Provider } from "react-redux";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import "../styles/globals.css";
import store from "./../Store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
