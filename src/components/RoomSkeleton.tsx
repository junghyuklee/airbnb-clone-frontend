import { Box, HStack, Skeleton } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded='2xl' mb={7} height={"280px"} />
      <HStack justifyContent={"space-between"}>
        <Skeleton rounded={"lg"} width={"60%"} height={5} mb={1} />
        <Skeleton rounded={"lg"} width={"15%"} height={5} />
      </HStack>
      <Skeleton rounded={"lg"} width={"40%"} height={5} mb={1} />
      <Skeleton rounded={"lg"} width={"30%"} height={5} mb={3} />
      <Skeleton rounded={"lg"} width={"25%"} height={5} />
    </Box>
  );
}
