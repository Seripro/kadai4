import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};
