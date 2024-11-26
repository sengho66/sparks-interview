"use client";
import styles from "./page.module.css";
import { useWs } from "./hooks/useWs";
import { Box } from "@chakra-ui/react";
import Connection from "./components/Connection";
import Symbol from "./components/Symbol";
export default function Home() {
  const { btc, eth, connected } = useWs(["BTC/USDT", "ETH/USDT"]);

  return (
    <Box className={styles.page}>
      <Box
        className={styles.main}
        display="flex"
        alignItems="center"
        border="1px solid #cacaca"
        p="1rem"
        borderRadius="1rem"
        minW="625px"
      >
        <Connection status={connected} />
        <Box display="flex">
          <Box mr="20px" display="flex">
            <Symbol name={"BTC/USDT"} symbol={btc} />
          </Box>
          <Box ml="20px">
            <Symbol name={"ETH/USDT"} symbol={eth} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
