import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { getUploadImgUrl, registPhoto, uploadImage } from "../api";

interface IUploadImgForm {
  id: string;
  file: FileList;
}

interface IUploadImgURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IUploadImgForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  const registPhotoMutation = useMutation(registPhoto, {
    onSuccess: (data: any) => {
      toast({
        title: "Image Upload Completed",
        status: "success",
        description: "Feel free to upload more images",
        isClosable: true,
        position: "bottom-right",
      });
      reset();
    },
  });
  const uploadImgMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        registPhotoMutation.mutate({
          description: "no Desc.",
          file: `https://imagedelivery.net/04mWdNyU6EGiRWhngCkvgA/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadImgUrlMutation = useMutation(getUploadImgUrl, {
    onSuccess: (data: IUploadImgURLResponse) => {
      uploadImgMutation.mutate({
        file: watch("file"),
        uploadURL: data.uploadURL,
      });
    },
  });

  useHostOnlyPage();
  const onSubmit = (data: IUploadImgForm) => {
    uploadImgUrlMutation.mutate();
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as={"form"}
            spacing={5}
            mt={10}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <Input {...register("file")} type='file' accept='image/*' />
            </FormControl>
            <Button
              isLoading={
                registPhotoMutation.isLoading ||
                uploadImgMutation.isLoading ||
                uploadImgUrlMutation.isLoading
              }
              type={"submit"}
              w='full'
              colorScheme={"red"}
            >
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
