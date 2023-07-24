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
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  pk: number;
  isOwner: boolean;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  pk,
  isOwner,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.500");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault(); // click이 링크로 전파되는것을 방지(버블링 방지)한다.
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box
          w={"100%"}
          position={"relative"}
          overflow={"hidden"}
          mb={3}
          rounded={"2xl"}
        >
          {imageUrl ? (
            <Image objectFit={"cover"} minH={"280"} src={imageUrl} />
          ) : (
            <Box minH={"280"} h='100%' w='100%' p={10} bg='gray.400' />
          )}
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={3}
            right={0}
            onClick={onCameraClick}
            color='white'
          >
            {isOwner ? <FaCamera size='20px' /> : <FaRegHeart size='20px' />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as='b' noOfLines={1} fontSize='md'>
              {name}
            </Text>
            <HStack spacing={1} alignItems={"center"}>
              <FaStar size={12} />
              <Text fontSize={"sm"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as='b'>${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
