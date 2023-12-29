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
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";

const LoginCard = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!inputs.username.trim() || !inputs.password.trim()) {
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
      const res = await fetch("/api/users/login", {
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
      showToast("Success", "Login successful", "success");
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
        backgroundImage={"twineLogin.png"}
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
              Login
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.dark")}
            boxShadow={"lg"}
            p={8}
            w={{ base: "full", sm: "400px" }}
          >
            <Stack spacing={4}>
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
                  loadingText="Logging in"
                  size="lg"
                  bg={useColorModeValue("gray.600", "gray.700")}
                  color={"white"}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.800"),
                  }}
                  onClick={handleLogin}
                  isLoading={loading}
                >
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don&apos;t have an account?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => setAuthScreen("signup")}
                  >
                    Sign up
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

export default LoginCard;
