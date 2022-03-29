/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import AuthenticatedLayout from "../components/Layouts/AuthenticatedLayout";
import AuthProvider from "../context/AuthProvider";
import store from "../redux/Store/store";
import "../styles/globals.css";

const noAuthRequired = ["/", "/login", "/register", `/blog/[slug]`];

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <Provider store={store}>
            <AuthProvider>
                {noAuthRequired.includes(router.pathname) ? (
                    <Component {...pageProps} />
                ) : (
                    <AuthenticatedLayout>
                        <Component {...pageProps} />
                    </AuthenticatedLayout>
                )}
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
