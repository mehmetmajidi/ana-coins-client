import { gql } from "@apollo/client";

export const GET_PROFIT_PREDICTION = gql`
     query GetProfitPrediction($symbol: String!, $investmentAmount: Float!) {
          getProfitPrediction(symbol: $symbol, investmentAmount: $investmentAmount) {
               currentPrice
               investmentAmount
               predictedPrice
               profit
               symbol
               latestRSI
               predictedPercentage
          }
     }
`;
