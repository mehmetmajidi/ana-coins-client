import Head from "next/head";
import ThemeToggle from "@/components/base/themeToggle/theme-toggle";
import LangButton from "@/components/base/language-toggle/lang-dropdown";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GetProfitPrediction from "@/components/getProfitPrediction/getProfitPrediction";

export default function Home() {
     const { t } = useTranslation("anacoin");

     return (
          <>
               <Head>
                    <title>{t("text.title")}</title>
                    <meta name="description" content="Welcome To AnaCoins" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
               </Head>
               <div>
                    <div className="header">
                         <h1>{t("text.site-name")}</h1>
                         <div className="header-right">
                              <LangButton />
                              <ThemeToggle />
                         </div>
                    </div>
                    <h3>{t("text.welcome")}</h3>
                    <div>
                         <GetProfitPrediction />
                    </div>
               </div>
          </>
     );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
     return {
          props: {
               ...(await serverSideTranslations(locale ?? "en", ["anacoin"])),
          },
     };
};
