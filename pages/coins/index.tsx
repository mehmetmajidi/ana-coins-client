import { useSubscription } from "@apollo/client";
import { GET_COIN_UPDATE } from "@/_core/services/graphql/subscriptions/allCoins";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import styles from "./coins.module.css";
import PagePagination from "@/components/pagination/pagination";
import { useState } from "react";

interface CoinData {
     symbol: string;
     priceChange: string;
     priceChangePercent: string;
     weightedAvgPrice: string;
     prevClosePrice: string;
     lastPrice: string;
     lastQty: string;
     bidPrice: string;
     bidQty: string;
     askPrice: string;
     askQty: string;
     openPrice: string;
     highPrice: string;
     lowPrice: string;
     volume: string;
     quoteVolume: string;
     openTime: number;
     closeTime: number;
     firstId: number;
     lastId: number;
     count: number;
}

interface CoinUpdatesResponse {
     coinUpdates: {
          coins: CoinData[];
          totalCoins: number;
     };
}

const Coins = () => {
     const { t } = useTranslation("atwallet");
     const [currentPage, setCurrentPage] = useState<number>(1);
     const [itemsPerPage, setItemsPerPage] = useState<number>(25);

     // Subscribe to coin updates with pagination
     const { data, loading, error } = useSubscription<CoinUpdatesResponse>(GET_COIN_UPDATE, {
          variables: {
               pageSize: itemsPerPage,
               page: currentPage,
          },
     });

     if (loading) return <p>{t("loading")}</p>;
     if (error)
          return (
               <p>
                    {t("error-loading-data")}: {error.message}
               </p>
          );

     // Sort coins alphabetically by symbol
     const sortedCoins = data?.coinUpdates.coins.sort((a, b) => a.symbol.localeCompare(b.symbol));

     return (
          <div>
               {/* Pagination Component */}
               <PagePagination totalItems={data?.coinUpdates.totalCoins || 0} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
               <h1>{t("updates")}</h1>
               <ul>
                    {sortedCoins &&
                         sortedCoins.map((coin, index) => (
                              <li key={index}>
                                   <strong>{coin.symbol}</strong>:
                                   <ul className={styles.coinItem}>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("price-change")}:</span>
                                             <span> {coin.priceChange}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("price-change-percent")}:</span>
                                             <span> {coin.priceChangePercent}%</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("weighted-avg-price")}:</span>
                                             <span> {coin.weightedAvgPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("prev-close-price")}:</span>
                                             <span> {coin.prevClosePrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("last-price")}:</span>
                                             <span> {coin.lastPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("last-qty")}:</span>
                                             <span> {coin.lastQty}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("bid-price")}:</span>
                                             <span> {coin.bidPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("bid-qty")}:</span>
                                             <span> {coin.bidQty}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("ask-price")}:</span>
                                             <span> {coin.askPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("ask-qty")}:</span>
                                             <span> {coin.askQty}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("open-price")}:</span>
                                             <span> {coin.openPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("high-price")}:</span>
                                             <span> {coin.highPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("low-price")}:</span>
                                             <span> {coin.lowPrice}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("volume")}:</span>
                                             <span> {coin.volume}</span>
                                        </li>
                                        <li className={styles.listItem}>
                                             <span className={styles.listItemTitle}>{t("quote-volume")}:</span>
                                             <span> {coin.quoteVolume}</span>
                                        </li>
                                   </ul>
                              </li>
                         ))}
               </ul>
          </div>
     );
};

export default Coins;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
     return {
          props: {
               ...(await serverSideTranslations(locale ?? "en", ["atwallet"])),
          },
     };
};
