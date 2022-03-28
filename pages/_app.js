/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from "react-redux";
import AuthProvider from "../context/AuthProvider";
import store from "../redux/Store/store";
import "../styles/globals.css";

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
