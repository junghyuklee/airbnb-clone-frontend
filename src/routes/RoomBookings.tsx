import { useQuery } from "@tanstack/react-query";
import { IRoomBookingList } from "../types";
import { getRoomBookings } from "../api";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { Avatar, Box, Grid, HStack, Text } from "@chakra-ui/react";

export default function RoomBookings() {
  const { roomPk } = useParams();
  const { data } = useQuery<IRoomBookingList[]>(
    ["roomBookings", roomPk],
    getRoomBookings,
  );

  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Grid gap={10} templateColumns={"1fr 1fr"}>
          {data?.map((roomBooking) => (
            <HStack key={roomBooking.pk}>
              <Avatar
                name={roomBooking.user.name}
                size={"xl"}
                src={roomBooking.user.avatar}
              />
              <Box>
                <Text display={"block"} as='b' noOfLines={1} fontSize='md'>
                  Reservation name: {roomBooking.user.name}
                </Text>
                <Text display={"block"} noOfLines={1} fontSize='md'>
                  Reservation Period: {roomBooking.check_in} ~
                  {roomBooking.check_out}
                </Text>
                <Text display={"block"} noOfLines={1} fontSize='md'>
                  Guests: {roomBooking.guests}
                </Text>
              </Box>
            </HStack>
          ))}
        </Grid>
      </Box>
    </ProtectedPage>
  );
}
