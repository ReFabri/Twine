import { Flex, useColorMode } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb="12">
      <Image
        cursor={"pointer"}
        alt="logo"
        width={10}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
