import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Textarea,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const UpdateProfilePage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState(() => ({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
    password: "",
  }));
  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-twine", JSON.stringify(data.user));
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading p={3} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Profile
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder={user.name}
              value={inputs.name}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, name: e.target.value }))
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder={user.username}
              value={inputs.username}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, username: e.target.value }))
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder={user.email}
              value={inputs.email}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, email: e.target.value }))
              }
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder={user.bio}
              value={inputs.bio}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, bio: e.target.value }))
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="password"
                value={inputs.password}
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, password: e.target.value }))
                }
                _placeholder={{ color: "gray.500" }}
              />
              <InputRightElement h={"full"}>
                <Button
                  p={0}
                  m={0}
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? (
                    <BiSolidShow size="50%" />
                  ) : (
                    <BiSolidHide size="50%" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Stack pt={6} spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default UpdateProfilePage;
