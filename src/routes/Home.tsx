import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={35}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(5, 1fr)"}
    >
      <VStack alignItems={"fles-start"} spacing={-0.5}>
        <Box overflow={"hidden"} mb={2} rounded={"3xl"}>
          <Image
            h={"280"}
            src='https://a0.muscache.com/im/pictures/32e8b4a0-83ff-4dba-8253-5340d8d05215.jpg?im_w=720'
          />
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as='b' noOfLines={1} fontSize='md'>
              Hwachon-myeon, Hongcheon, Gangwon Province, South Korea
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color='gray.600'>
            Seoul, S.Korea
          </Text>
        </Box>
        <Text fontSize={"sm"} color='gray.600'>
          <Text as='b'>$72</Text> / night
        </Text>
      </VStack>
    </Grid>
  );
}
