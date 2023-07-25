import { Grid } from "@chakra-ui/react";
import BookingRoom from "../components/BookingRoom";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../api";
import { IUserBookingList } from "../types";

export default function MyBooking() {
  const { data } = useQuery<IUserBookingList[]>(
    ["myBookings"],
    getUserBookings,
  );
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
      templateColumns={{
        sm: "1fr",
        md: "1fr",
        lg: "1fr 1fr",
        xl: "1fr 1fr",
        "2xl": "1fr 1fr",
      }}
    >
      {data?.map((bookingRoom) => (
        <BookingRoom
          key={bookingRoom.pk}
          pk={bookingRoom.room.pk}
          imageUrl={bookingRoom.room.photos[0]?.file}
          name={bookingRoom.room.name}
          city={bookingRoom.room.city}
          country={bookingRoom.room.country}
          check_in={bookingRoom.check_in}
          check_out={bookingRoom.check_out}
          guests={bookingRoom.guests}
        />
      ))}
    </Grid>
  );
}
