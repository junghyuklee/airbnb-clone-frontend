import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEdit, FaStar } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
  const gray = useColorModeValue("gray.600", "gray.500");
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData } = useQuery<IReview[]>(
    [`rooms`, roomPk, `reviews`],
    getRoomReviews,
  );
  const [dates, setDates] = useState<any>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    },
  );
  const navigate = useNavigate();
  const onEditClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault(); // click이 링크로 전파되는것을 방지(버블링 방지)한다.
    navigate(`/rooms/${data?.id}/edit`);
  };
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading} mb={2}>
        <HStack>
          <Heading>{data?.name}</Heading>
          <Button variant={"unstyled"} onClick={onEditClick}>
            {data?.is_owner ? <FaEdit size={25} /> : null}
          </Button>
        </HStack>
      </Skeleton>
      <Skeleton height={"21px"} width={"20%"} isLoaded={!isLoading}>
        <HStack spacing={1} alignItems={"center"}>
          <FaStar size={12} />
          <Text fontSize={"sm"}>{data?.rating}</Text>
          <Text fontSize={"sm"} color={gray}>
            · {data?.address}, {data?.city}, {data?.country}
          </Text>
        </HStack>
      </Skeleton>
      <Grid
        mt={8}
        rounded={"xl"}
        overflow={"hidden"}
        gap={3}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  src={data?.photos[index]?.file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={60} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack w={"40%"} justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <HStack justifyContent={"flex-start"} w={"100%"}>
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>·</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>·</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} marginX={"none"} maxW={"container.lg"}>
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size={"md"}
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size={"12px"} />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={setDates}
            prev2Label={null}
            next2Label={null}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 3 * 6 * 1000)}
            minDetail='month'
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking && dates !== undefined}
            my={5}
            w={"70%"}
            colorScheme={"red"}
          >
            Make Booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color='red.500'>Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
