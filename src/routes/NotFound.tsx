import { Button, Heading, Link, Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <VStack bg={"gray.100"} justifyContent={"center"} minH='100vh'>
      <Heading>Page not found.</Heading>
      <Text>It seems that you're lost.</Text>
      <Link href='/'>
        <Button colorScheme={"red"} variant={"link"}>
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
