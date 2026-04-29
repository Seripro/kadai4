import { getAllUsers } from "@/utils/supabaseFunctions";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [id, setId] = useState<string>("");
  const [ids, setIds] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleClick = () => {
    setError("");
    if (ids.includes(id)) {
      navigate(`/cards/${id}`);
    } else {
      setError("そのIDは存在しません");
    }
    if (id == "") setError("IDを入力して下さい");
  };
  useEffect(() => {
    const getAllId = async () => {
      try {
        const users = await getAllUsers();
        const newIds = users.map((user) => user.user_id);
        setIds(newIds);
      } catch (e) {
        console.log(e);
      }
    };
    getAllId();
  }, []);
  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      gap={4}
      p={4}
      bg="gray.50"
    >
      <Box
        w="full"
        maxW="sm"
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={8}
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          デジタル名刺アプリ
        </Heading>
        <VStack gap={4} align="stretch">
          <Input
            placeholder="ユーザーIDを入力"
            onChange={handleChange}
            value={id}
          />
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Flex gap={3} justify="center" wrap="wrap">
            <Button
              onClick={handleClick}
              type="submit"
              colorScheme="blue"
              w="full"
              mt={4}
              variant="surface"
              colorPalette="green"
            >
              表示する
            </Button>
          </Flex>
        </VStack>
      </Box>
      <Button onClick={() => navigate("/cards/register")} variant="ghost">
        新規登録
      </Button>
    </Flex>
  );
};
