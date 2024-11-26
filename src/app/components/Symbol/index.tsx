import { Response } from "@/app/hooks/useWs";
import { Box, Text, Skeleton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
interface Props {
  name: string;
  symbol: Response | undefined;
}

const Price = ({
  color,
  price,
}: {
  color: string;
  price: number | undefined;
}) => {
  return price ? (
    <Text
      ml="0.75rem"
      fontWeight="500"
      style={{
        color: color,
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease",
      }}
    >
      {`$${price}`}
    </Text>
  ) : (
    <Skeleton bgColor="#b1b1b1" ml="0.75rem" minW="75px" />
  );
};

const Symbol = ({ name, symbol }: Props) => {
  const prevAmount = useRef(0);
  const [color, setColor] = useState("green");

  useEffect(() => {
    if (symbol?.bid) {
      if (symbol.bid > prevAmount.current) {
        setColor("#27b027");
      } else {
        setColor("#ff1e1e");
      }
      prevAmount.current = symbol.bid;
    }
  }, [symbol]);

  return (
    <Box
      display="flex"
      bgColor="#ececec"
      flexDirection="column"
      alignItems="center"
      p="1rem"
      minW="270px"
    >
      <Box>
        <Text fontSize="1.1rem" color="rgba(31,26,44,0.92)" fontWeight="600">
          {name}
        </Text>
      </Box>
      <Box display="flex">
        <Box display="flex" p="0.5rem">
          <Text fontWeight="500">Bid: </Text>
          <Price color={color} price={symbol?.bid} />
        </Box>
        <Box display="flex" p="0.5rem">
          <Text fontWeight="500">Ask: </Text>
          <Price color={color} price={symbol?.ask} />
        </Box>
      </Box>
    </Box>
  );
};

export default Symbol;
