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
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUserNinja, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUserDefaultSignUpError,
  IUserDefaultSignUpVariables,
  signUpErrMsgType,
  userDefaultSignUp,
} from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ISignUpForm {
  name: string;
  email: string;
  username: string;
  password: string;
  chkPassword: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUpForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const signUpMutation = useMutation<
    unknown,
    IUserDefaultSignUpError,
    IUserDefaultSignUpVariables
  >(userDefaultSignUp, {
    onSuccess: (data) => {
      toast({
        title: "welcome sigh up complete!",
        status: "success",
        position: "bottom-right",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: (error) => {
      const errMsgList: signUpErrMsgType = error.response.data;
      Object.values(errMsgList).forEach((errorList) => {
        errorList.forEach((errorMessage) => {
          toast({
            title: errorMessage,
            status: "error",
            position: "bottom-right",
          });
        });
      });
    },
  });
  const onSubmit = ({
    name,
    email,
    username,
    password,
    chkPassword,
  }: ISignUpForm) => {
    if (password === chkPassword) {
      signUpMutation.mutate({
        name,
        email,
        username,
        password,
      });
    } else {
      toast({
        title: "Password & Check Password are not the same.",
        status: "error",
        position: "bottom-right",
      });
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
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
                isInvalid={Boolean(errors.username)}
                {...register("username", {
                  required: true,
                })}
                variant={"filled"}
                placeholder='User ID'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email)}
                {...register("email", {
                  required: true,
                })}
                variant={"filled"}
                placeholder='Email'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name)}
                {...register("name", {
                  required: true,
                })}
                variant={"filled"}
                placeholder='Name'
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
                isInvalid={Boolean(errors.password)}
                {...register("password", {
                  required: true,
                })}
                type='password'
                variant={"filled"}
                placeholder='Password'
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
                isInvalid={Boolean(errors.chkPassword)}
                {...register("chkPassword", {
                  required: true,
                })}
                type='password'
                variant={"filled"}
                placeholder='Check Password'
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={signUpMutation.isLoading}
            type='submit'
            mt={4}
            colorScheme={"red"}
            w='100%'
          >
            Sign Up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
