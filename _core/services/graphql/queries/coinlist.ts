import { gql } from "@apollo/client";

export const GET_COINS_LIST = gql`
     query GetAllCoins {
          getAllCoins {
               name
          }
     }
`;
