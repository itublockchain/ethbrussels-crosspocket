import { http, createConfig } from "wagmi";
import { sepolia, avalancheFuji, polygonAmoy } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia, avalancheFuji, polygonAmoy],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com	"),
    [avalancheFuji.id]: http(
      "https://rpc.ankr.com/avalanche_fuji/d17775fb78762b92aacf9f30af7ccaac0c4e758d5bb9f2ebc3faef3b9cbed604"
    ),
    [polygonAmoy.id]: http(
      "https://rpc.ankr.com/polygon_amoy/d17775fb78762b92aacf9f30af7ccaac0c4e758d5bb9f2ebc3faef3b9cbed604"
    ),
  },
});
