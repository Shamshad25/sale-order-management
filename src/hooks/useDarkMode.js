import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

const useDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    const savedColorMode = localStorage.getItem("chakra-ui-color-mode");
    if (savedColorMode && savedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);
};

export default useDarkMode;
