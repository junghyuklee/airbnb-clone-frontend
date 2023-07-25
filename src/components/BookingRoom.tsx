import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  city: string;
  country: string;
  check_in: string;
  check_out: string;
  guests: number;
}

export default function BookingRoom({
  pk,
  imageUrl,
  name,
  city,
  country,
  check_in,
  check_out,
  guests,
}: IRoomProps) {
  return (
    <Grid gap={5} templateColumns={"1fr 1fr"}>
      <Link to={`/rooms/${pk}`}>
        <Box>
          <Box
            h={"300px"}
            w={"600px"}
            position={"relative"}
            overflow={"hidden"}
            mb={3}
            rounded={"2xl"}
          >
            {imageUrl ? <Image src={imageUrl} /> : <Box bg='gray.400' />}
          </Box>
          <Box>
            <Text display={"block"} as='b' noOfLines={1} fontSize='md'>
              {name} _ {city}, {country}
            </Text>
          </Box>
          <Box>
            <Text display={"block"} as='b' noOfLines={1} fontSize='md'>
              Booking: From: {check_in} ~ To:{check_out}
            </Text>
            <Text display={"block"} as='b' noOfLines={1} fontSize='md'>
              Guests: {guests}
            </Text>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
}
