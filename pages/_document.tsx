import { Html, Head, Main, NextScript, DocumentProps, DocumentContext, DocumentInitialProps } from "next/document";

interface MyDocumentProps extends DocumentProps {
     locale?: string;
}
function Document({ locale }: MyDocumentProps) {
     return (
          <Html lang={locale || "en"} dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}>
               <Head />
               <body>
                    <script
                         dangerouslySetInnerHTML={{
                              __html: `
                            (function() {
                                const theme = localStorage.getItem('theme') || 'light';
                                const locale = localStorage.getItem('locale') || 'en';
                                document.documentElement.setAttribute('data-theme', theme);
                                document.documentElement.setAttribute('lang', locale);
                                document.documentElement.setAttribute('dir', locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr');
                                document.documentElement.className = locale === 'fa' || locale === 'ar' ? 'vazirmatn' : 'inter';
                            })();
                        `,
                         }}
                    />
                    <Main />
                    <NextScript />
               </body>
          </Html>
     );
}

Document.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & { locale?: string }> => {
     const initialProps = await ctx.defaultGetInitialProps(ctx);
     const locale = Array.isArray(ctx.query.locale) ? ctx.query.locale[0] : ctx.query.locale;
     return { ...initialProps, locale: locale || "en" };
};

export default Document;
