import { useState } from "react";
import { Flex, Avatar, Text } from "@chakra-ui/react";

const Comment = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src="/avatar.jpg" size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              duderealperson
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Comment;
