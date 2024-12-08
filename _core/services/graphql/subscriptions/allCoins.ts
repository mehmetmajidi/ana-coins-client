import { gql } from "@apollo/client";

export const GET_COIN_UPDATE = gql`
     subscription Subscription($page: Int!, $pageSize: Int!) {
          coinUpdates(page: $page, pageSize: $pageSize) {
               coins {
                    symbol
                    priceChange
                    priceChangePercent
                    weightedAvgPrice
                    prevClosePrice
                    lastPrice
                    lastQty
                    bidPrice
                    bidQty
                    askPrice
                    askQty
                    openPrice
                    highPrice
                    lowPrice
                    volume
                    quoteVolume
               }
               totalCoins
          }
     }
`;
