import { useState, useRef } from "react";
import {
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Textarea,
  Text,
  Input,
  Flex,
  Image,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";

const CreatePost = () => {
  const MAX_CHAR = 500;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const imageRef = useRef();
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [remainingChar, setRemainingChar] = useState(500);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const setPosts = useSetRecoilState(postsAtom);
  const { username } = useParams();

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post created successfully", "success");
      if (username === user.username) {
        setPosts((prev) => {
          return [data.newPost, ...prev];
        });
      }
      setPostText("");
      setImgUrl("");
      onClose();
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        position={"fixed"}
        bottom={{ base: 3, sm: 10 }}
        right={{ base: 3, sm: 10 }}
        onClick={onOpen}
        width={57}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        _hover={{
          width: { base: 100, sm: 120 },
          bg: useColorModeValue("gray.300", "gray.dark"),
        }}
        transition={"all"}
        transitionDuration={"0.3s"}
        borderRadius={5}
      >
        <Button
          size={{ base: "sm", sm: "md" }}
          bg={useColorModeValue("gray.300", "gray.dark")}
          display={"inline-block"}
        >
          <FaPlus size={20} />
        </Button>
        <Text
          px={3}
          fontWeight={"bold"}
          fontSize={{ base: "sm", sm: "md" }}
          cursor={"pointer"}
          display={"inline-block"}
        >
          Post
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="Selected image" />
                <CloseButton
                  onClick={() => setImgUrl("")}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
