import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Inter, Vazirmatn } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "@/_core/services/graphql/apolloClient";

const inter = Inter({
     subsets: ["latin"],
     weight: ["100", "300", "400", "500", "600", "700"],
     display: "swap", // Ensures fallback font is used until the custom font is loaded
});

const vazirmatn = Vazirmatn({
     subsets: ["arabic", "latin"],
     weight: ["400", "500", "600", "700", "800", "900"],
     display: "swap",
});

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
     const router = useRouter();

     useEffect(() => {
          // Store locale in local storage and set HTML lang and dir attributes
          if (router.locale) {
               localStorage.setItem("locale", router.locale);
               document.documentElement.setAttribute("lang", router.locale);
               document.documentElement.setAttribute("dir", router.locale === "fa" || router.locale === "ar" ? "rtl" : "ltr");
          }
     }, [router.locale]);

     const fontClassName = router.locale === "fa" || router.locale === "ar" ? vazirmatn.className : inter.className;

     return (
          <ApolloProvider client={client}>
               <Component className={fontClassName} {...pageProps} />
          </ApolloProvider>
     );
};

export default appWithTranslation(MyApp);
