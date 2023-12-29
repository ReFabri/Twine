import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import authScreenAtom from "../atoms/authAtom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  HStack,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";

const SignupCard = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleSignup = async () => {
    try {
      setLoading(true);
      if (
        !inputs.name.trim() ||
        !inputs.username.trim() ||
        !inputs.email.trim() ||
        !inputs.password.trim()
      ) {
        showToast("Error", "All fields are required", "error");
        return;
      }
      if (inputs.password.length < 6) {
        showToast(
          "Error",
          "Password must be at least 6 characters long",
          "error"
        );
        return;
      }
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-twine", JSON.stringify(data));
      setUser(data);
      showToast("Success", "User created successfully", "success");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        position={"absolute"}
        top={"-20px"}
        left={0}
        w={"100%"}
        h={"99dvh"}
        backgroundImage={"twineSignup.png"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        opacity={"30%"}
        zIndex={-1}
      ></Box>

      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.dark")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, name: e.target.value }))
                      }
                      value={inputs.name}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      value={inputs.username}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, email: e.target.value }))
                  }
                  value={inputs.email}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    value={inputs.password}
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
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue("gray.600", "gray.700")}
                  color={"white"}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.800"),
                  }}
                  onClick={handleSignup}
                  isLoading={loading}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => setAuthScreen("login")}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignupCard;
