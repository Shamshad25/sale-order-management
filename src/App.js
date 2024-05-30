import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Box } from "@chakra-ui/react";

const queryClient = new QueryClient();

function App() {
  return (
    <Box display={"grid"} justifyContent={"center"}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
