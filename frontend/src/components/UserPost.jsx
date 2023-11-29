import { Link } from "react-router-dom";
import { Flex, Avatar, Box } from "@chakra-ui/react";

const UserPost = () => {
  return (
    <Link to={"/dude/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Dude RealPerson" src="/avatar.jpg" />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}></Box>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
