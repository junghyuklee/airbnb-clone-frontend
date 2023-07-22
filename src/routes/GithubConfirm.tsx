import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loginMutation = useMutation(githubLogIn, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome!",
        description: "Git Login Success.",
        position: "bottom-right",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      loginMutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={"xl"} />
    </VStack>
  );
}
