import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUserDefaultLoginError,
  IUserDefaultLoginSuccess,
  IUserDefaultLoginVariables,
  userDefualtLogin,
} from "../api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ILoginForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const loginMutation = useMutation<
    IUserDefaultLoginSuccess,
    IUserDefaultLoginError,
    IUserDefaultLoginVariables
  >(userDefualtLogin, {
    onSuccess: (data) => {
      toast({
        title: "welcome back!",
        status: "success",
        position: "bottom-right",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });
  const onSubmit = ({ username, password }: ILoginForm) => {
    loginMutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder='Username'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type='password'
                variant={"filled"}
                placeholder='Password'
              />
            </InputGroup>
          </VStack>
          {loginMutation.isError ? (
            <Text color='red.500' textAlign={"center"} fontSize={"sm"}>
              Username or Password are worng
            </Text>
          ) : null}
          <Button
            isLoading={loginMutation.isLoading}
            type='submit'
            mt={4}
            colorScheme={"red"}
            w='100%'
          >
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
