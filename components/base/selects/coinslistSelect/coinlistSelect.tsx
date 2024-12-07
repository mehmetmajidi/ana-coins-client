import { useQuery } from "@apollo/client";
import { GET_COINS_LIST } from "@/_core/services/graphql/queries/coinlist";
import Select from "react-select";

interface CoinlistSelectProps {
     value: { label: string; value: string } | null;
     onChange: (e: any) => void;
}

const CoinlistSelect = ({ value, onChange }: CoinlistSelectProps) => {
     const { loading, error, data } = useQuery(GET_COINS_LIST);

     if (loading) return <p>Loading coins...</p>;
     if (error) return <p>Error loading coins: {error.message}</p>;

     const coins = data?.getAllCoins || [];

     // Map coins to the format expected by react-select
     const options = coins.map((coin: { name: string }) => ({
          label: coin.name,
          value: coin.name,
     }));

     return <Select value={value} onChange={onChange} options={options} placeholder="Select a Coin" />;
};

export default CoinlistSelect;
