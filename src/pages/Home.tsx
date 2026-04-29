import { getAllUsers } from "@/utils/supabaseFunctions";
import { Button, Input, Text } from "@chakra-ui/react";
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
    <>
      <h1>デジタル名刺アプリ</h1>
      <Input onChange={handleChange} />
      {error && (
        <Text color="red.500" fontSize="sm" style={{ textAlign: "left" }}>
          {error}
        </Text>
      )}
      <Button onClick={handleClick}>表示する</Button>
    </>
  );
};
