import { Flex, Avatar, Text, Divider } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={4} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
          </Flex>
          <Text py={2}>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply && <Divider />}
    </>
  );
};

Comment.propTypes = {
  reply: PropTypes.object,
  lastReply: PropTypes.bool,
};

export default Comment;
