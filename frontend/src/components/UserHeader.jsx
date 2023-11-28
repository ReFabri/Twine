import { Avatar, Box, Flex, VStack, Text } from "@chakra-ui/react";

const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} width={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Dude Realperson
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>realdude</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              twine.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Dude Realperson" src="/avatar.jpg" size={"xl"} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
