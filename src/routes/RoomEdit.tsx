import ProtectedPage from "../components/ProtectedPage";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import {
  IUpdateRoomVariables,
  getAmenities,
  getCategories,
  getRoom,
  updateRoom,
} from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import useHostOnlyPage from "../components/HostOnlyPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function RoomEdit() {
  const { roomPk } = useParams();
  const { register, handleSubmit } = useForm<IUpdateRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const updateRoomMutation = useMutation(updateRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        title: "Room update complete!",
        status: "success",
        position: "bottom-right",
      });
      navigate(`/rooms/${data.id}`);
    },
  });

  const { data: updateRoomData, isLoading: isUpdateRoomDataLoading } =
    useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  let updateRoomAmenityList: number[] = [];
  updateRoomData?.amenities.map((chkAmenity) =>
    updateRoomAmenityList.push(chkAmenity.pk),
  );

  const { data: amenitiesData, isLoading: isAmenitiesDataLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);

  useHostOnlyPage();
  const onSubmit = (data: IUpdateRoomVariables) => {
    if (roomPk) {
      data.roomPk = roomPk;
      updateRoomMutation.mutate(data);
    }
  };
  return (
    <ProtectedPage>
      {isUpdateRoomDataLoading ||
      isAmenitiesDataLoading ||
      isCategoriesDataLoading ? null : (
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Helmet>
            <title>{updateRoomData ? updateRoomData.name : "Loading..."}</title>
          </Helmet>
          <Container>
            <Heading textAlign={"center"}>Update Room</Heading>
            <VStack
              spacing={10}
              as={"form"}
              mt={5}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  defaultValue={updateRoomData?.name}
                  required
                  type='text'
                />
                <FormHelperText>Wirte the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country", { required: true })}
                  defaultValue={updateRoomData?.country}
                  required
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register("city", { required: true })}
                  defaultValue={updateRoomData?.city}
                  required
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("address", { required: true })}
                  defaultValue={updateRoomData?.address}
                  required
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaMoneyBill />} />
                  <Input
                    {...register("price", { required: true })}
                    defaultValue={updateRoomData?.price}
                    type='number'
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register("rooms", { required: true })}
                    defaultValue={updateRoomData?.rooms}
                    type='number'
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register("toilets", { required: true })}
                    defaultValue={updateRoomData?.toilets}
                    type='number'
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  defaultValue={updateRoomData?.description}
                />
              </FormControl>
              <FormControl>
                <Checkbox
                  {...register("pet_friendly")}
                  defaultChecked={updateRoomData?.pet_friendly}
                >
                  Pet Friendly?
                </Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select
                  {...register("kind", { required: true })}
                  placeholder='Choose a kind'
                  defaultValue={updateRoomData?.kind}
                >
                  <option value='entire_place'>Entire Place</option>
                  <option value='private_room'>Private Room</option>
                  <option value='shared_room'>Shared Room</option>
                </Select>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", { required: true })}
                  placeholder='Choose a Category'
                  defaultValue={updateRoomData?.category.pk}
                >
                  {categoriesData?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  What Category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                  {amenitiesData?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox
                        value={amenity.pk}
                        {...register("amenities", { required: true })}
                        defaultChecked={
                          updateRoomAmenityList.filter(
                            (chkAmenity) => chkAmenity === amenity.pk,
                          ).length > 0
                            ? true
                            : false
                        }
                      >
                        {amenity.name}
                      </Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              <Button
                type={"submit"}
                isLoading={updateRoomMutation.isLoading}
                colorScheme={"red"}
                size='lg'
                w={"100%"}
              >
                Update Room
              </Button>
            </VStack>
          </Container>
        </Box>
      )}
    </ProtectedPage>
  );
}
