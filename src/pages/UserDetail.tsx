import type { User } from "@/types/userTypes";
import { getUserById } from "@/utils/supabaseFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(id);
        console.log(res);
        setUser(res.data?.[0]);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    getUser();
  }, [id]);

  if (!id) return <div>not found</div>;
  if (loading) return <div>loading...</div>;
  if (!user) return <div>not found</div>;

  return (
    <>
      <div>名前：{user.name}</div>
      <div>自己紹介：{user.description}</div>
      <div>スキル：</div>
      <div>GitHub：{user.github_id}</div>
      <div>Qiita：{user.qiita_id}</div>
      <div>X：{user.x_id}</div>
    </>
  );
};
