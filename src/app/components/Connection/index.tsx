import { Box, Text } from "@chakra-ui/react";
interface Props {
  status: boolean;
}
const Connection = ({ status }: Props) => {
  return (
    <Box
      display="flex"
      bgColor="rgba(31,26,44,0.92)"
      width="100%"
      justifyContent="center"
      pt="0.5rem"
      pb="0.5rem"
    >
      <Text fontWeight="bold" color="white">{`Connection status is: ${
        status ? "Open" : "Closed"
      }`}</Text>
    </Box>
  );
};

export default Connection;
