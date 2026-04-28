import { supabase } from "./supabase";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data.map((user) => {
    return {
      description: user.description,
      github_id: `https://github.com/${user.github_id}`,
      name: user.name,
      qiita_id: user.qiita_id,
      user_id: user.user_id,
      x_id: user.x_id,
    };
  });
};

export const getUserById = async (UserId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", UserId);
  if (error) throw error;
  return {
    description: data[0].description,
    github_id: `https://github.com/${data[0].github_id}`,
    name: data[0].name,
    qiita_id: data[0].qiita_id,
    user_id: data[0].user_id,
    x_id: data[0].x_id,
  };
};

export const getSkillIdsByUserId = async (UserId: string) => {
  const { data, error } = await supabase
    .from("user_skill")
    .select("*")
    .eq("user_id", UserId);
  if (error) throw error;
  return data.map((item) => item.skill_id);
};

export const getSkillsBySkillIds = async (SkillIds: number[]) => {
  return await supabase.from("skills").select("*").in("id", SkillIds);
};

export const getSkillsByUserId = async (UserId: string) => {
  const skillIds = await getSkillIdsByUserId(UserId);
  const { data, error } = await getSkillsBySkillIds(skillIds);
  if (error) throw error;
  return data;
};
