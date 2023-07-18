import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.500");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
        <Image
          minH={"280"}
          src='https://a0.muscache.com/im/pictures/32e8b4a0-83ff-4dba-8253-5340d8d05215.jpg?im_w=720'
        />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={3}
          right={0}
          color='white'
        >
          <FaRegHeart size='20px' />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"5fr 1fr"}>
          <Text as='b' noOfLines={1} fontSize='md'>
            Hwachon-myeon, Hongcheon, Gangwon Province, South Korea
          </Text>
          <HStack spacing={1} alignItems={"center"}>
            <FaStar size={12} />
            <Text fontSize={"sm"}>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>
          Seoul, S.Korea
        </Text>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        <Text as='b'>$72</Text> / night
      </Text>
    </VStack>
  );
}
