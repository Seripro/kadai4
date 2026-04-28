import { supabase } from "./supabase";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
};

export const getUserById = async (UserId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", UserId);
  if (error) throw error;
  return data;
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
  return data.map((item) => item.name);
};
