import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const githubParams = {
    client_id: "bc90b24233a834d6a1a6",
    scope: "read:user,user:email",
  };
  const kakaoParams = {
    client_id: "145c7d42253edad1ff05752f940f5878",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const githubUrlParams = new URLSearchParams(githubParams).toString();
  const kakaoUrlParams = new URLSearchParams(kakaoParams).toString();
  return (
    <Box mb={"4"}>
      <HStack my={"8"}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          colorScheme={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as='a'
          href={`https://github.com/login/oauth/authorize?${githubUrlParams}`}
          w='100%'
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as='a'
          href={`https://kauth.kakao.com/oauth/authorize?${kakaoUrlParams}`}
          width='100%'
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
