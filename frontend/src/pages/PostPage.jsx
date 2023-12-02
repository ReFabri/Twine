import { Flex, Avatar, Text, Image, Box } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

const PostPage = () => {
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/avatar.jpg" size={"md"} name="Dude Realperson" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Dude Realperson
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text>Let&apos;s Talk about Twine.</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={postImg} w={"full"} />
      </Box>
    </>
  );
};

export default PostPage;
