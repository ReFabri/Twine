import {
  Flex,
  useColorMode,
  Image,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <Flex justifyContent={user ? "space-between" : "right"} mt={6} mb="12">
      <Image
        position={"absolute"}
        top={1}
        left={"50%"}
        transform="translateX(-50%)"
        cursor={"pointer"}
        alt="logo"
        width={10}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />

      {user && (
        <>
          <Link as={RouterLink} to="/">
            <AiFillHome size={24} />
          </Link>
          <Flex alignItems={"center"} gap={4}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={24} />
            </Link>
            <Button size={"xs"} onClick={logout}>
              <HiOutlineLogout size={15} />
            </Button>
          </Flex>
        </>
      )}

      {!user && (
        <Flex
          flexWrap={"nowrap"}
          onClick={() => navigate("/auth")}
          cursor={"pointer"}
        >
          <HiOutlineLogin size={20} />
          <Text mx={1} fontSize={"0.8rem"}>
            Login / Signup
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
