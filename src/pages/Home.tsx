import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [id, setId] = useState<string>();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleClick = () => {
    navigate(`/cards/${id}`);
  };
  return (
    <>
      <h1>デジタル名刺アプリ</h1>
      <Input onChange={handleChange} />
      <Button onClick={handleClick}>表示する</Button>
    </>
  );
};
