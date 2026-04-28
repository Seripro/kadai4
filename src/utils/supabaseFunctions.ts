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
