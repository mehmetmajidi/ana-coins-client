import { GET_PROFIT_PREDICTION } from "@/_core/services/graphql/queries/getProfitPrediction";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import CoinlistSelect from "../base/selects/coinslistSelect/coinlistSelect";
import { useTranslation } from "next-i18next";
import styles from "./getProfitPredictions.module.css";

const GetProfitPrediction = () => {
     const { t } = useTranslation("anacoin");
     const [investmentAmount, setInvestmentAmount] = useState(300);

     // Initialize symbol as an object with label and value (to match CoinlistSelect's expected format)
     const [symbol, setSymbol] = useState<{ label: string; value: string } | null>({
          label: "DOGS",
          value: "DOGS",
     });

     const [getPrediction, { loading, error, data }] = useLazyQuery(GET_PROFIT_PREDICTION, {
          fetchPolicy: "no-cache",
     });

     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setInvestmentAmount(Number(e.target.value));
     };

     const handleFetchPrediction = () => {
          if (symbol) {
               getPrediction({
                    variables: {
                         symbol: symbol.value, // Use the value of the selected option
                         investmentAmount,
                    },
               });
          }
     };

     const handleSelectChange = (selectedOption: { label: string; value: string } | null) => {
          setSymbol(selectedOption);
     };

     const prediction = data?.getProfitPrediction;

     return (
          <div className={styles.pageContainer}>
               <div className={styles.formContainer}>
                    <h1>{t("text.prediction.profit_prediction")}</h1>
                    <form
                         onSubmit={(e) => {
                              e.preventDefault(); // Prevent form submission
                              handleFetchPrediction();
                         }}
                    >
                         <div>
                              <label htmlFor="symbol">{t("text.prediction.select_coin")}</label>
                              <CoinlistSelect value={symbol} onChange={handleSelectChange} />
                         </div>
                         <div>
                              <label htmlFor="investmentAmount">{t("text.prediction.investment_amount")}</label>
                              <input id="investmentAmount" type="number" value={investmentAmount} onChange={handleAmountChange} min={0} />
                         </div>
                         <button type="submit">Fetch Prediction</button>
                    </form>
               </div>
               <div className={styles.resultContainer}>
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error.message}</div>}
                    {prediction && (
                         <div>
                              <h2>
                                   {t("text.prediction.prediction_for")} {prediction.symbol}
                              </h2>
                              <ul className={styles.cardContainer}>
                                   <li>
                                        <span className={styles.itemTitle}>{t("text.prediction.investment_amount")}</span>
                                        {prediction.investmentAmount}$
                                   </li>
                                   <li>
                                        <span className={styles.itemTitle}>{t("text.prediction.current_price")}</span>
                                        {prediction.currentPrice}$
                                   </li>
                                   <li>
                                        <span className={styles.itemTitle}>{t("text.prediction.predicted_price")}</span>
                                        {prediction.predictedPrice}$
                                   </li>
                                   <li>
                                        <span className={styles.itemTitle}>{t("text.prediction.predicted_percentage")}</span>
                                        <span
                                             style={{
                                                  color: prediction.predictedPrice > 0 ? "green" : "red",
                                             }}
                                        >
                                             {prediction.predictedPercentage}%
                                        </span>
                                   </li>
                                   <li>
                                        <span className={styles.itemTitle}>{t("text.prediction.profit")}</span>

                                        <span
                                             style={{
                                                  color: prediction.profit > 0 ? "green" : "red",
                                             }}
                                        >
                                             {prediction.profit}
                                        </span>
                                   </li>
                                   <li>
                                        <span className={styles.itemTitle}>{t("text.prediction.latest_RSI")}</span>
                                        {prediction.latestRSI}
                                   </li>
                              </ul>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default GetProfitPrediction;
