import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import superjson from "superjson";
import Layout from "../components/layout";
import type { AppRouter } from "../server/router";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InitialLoadingScreen from "../components/InitialLoadingScreen";
import AppContextProvider from "../context";

const ReactQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppContextProvider>
            <Layout>
                <InitialLoadingScreen />
                <ToastContainer
                    position="top-center"
                    pauseOnFocusLoss={false}
                    pauseOnHover={false}
                    theme="colored"
                />
                <QueryClientProvider client={ReactQueryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </Layout>
        </AppContextProvider>
    );
}

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return "";
    }
    if (process.browser) return ""; // Browser should use current path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            url,
            transformer: superjson,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },

    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(MyApp);
