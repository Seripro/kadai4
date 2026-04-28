import type { Skill } from "@/types/skillTypes";
import type { User } from "@/types/userTypes";
import { getSkillsByUserId, getUserById } from "@/utils/supabaseFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    const getSkills = async () => {
      setLoading(true);
      try {
        const skills = await getSkillsByUserId(id);
        setSkills(skills);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    getUser();
    getSkills();
  }, [id]);

  if (!id) return <div>not found</div>;
  if (loading) return <div>loading...</div>;
  if (!user) return <div>not found</div>;

  return (
    <>
      <div>名前：{user.name}</div>
      <div>自己紹介：{user.description}</div>
      <div>スキル：</div>
      {skills.map((skill) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
      {user.github_id ? (
        <a href={user.github_id} target="_blank">
          GitHub
        </a>
      ) : null}
      {user.qiita_id ? (
        <a href={user.qiita_id} target="_blank">
          Qiita
        </a>
      ) : null}
      {user.x_id ? (
        <a href={user.x_id} target="_blank">
          X
        </a>
      ) : null}
    </>
  );
};
