import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import React from "react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <div className="App">
          <App />
        </div>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
