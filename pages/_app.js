/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from "react-redux";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import store from "../Store/store";
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
