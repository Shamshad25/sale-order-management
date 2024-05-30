import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username === "user" && password === "password") {
      localStorage.setItem("authenticated", "true");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      p={4}
      maxW="md"
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      background={"white"}
    >
      <Text
        textAlign={"center"}
        marginBottom={6}
        fontSize={24}
        fontWeight={"bold"}
      >
        Login Page
      </Text>
      <VStack spacing={4}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} w={"sm"}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
