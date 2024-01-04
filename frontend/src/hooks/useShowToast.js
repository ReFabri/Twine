import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        status,
        isClosable: true,
        duration: 5000,
        description: description.toString(),
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
