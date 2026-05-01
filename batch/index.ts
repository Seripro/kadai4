import { supabase } from "./supabase.ts";

const deleteAllUsers = async () => {
  const { error } = await supabase.from("users").delete().neq("user_id", "");
  if (error) throw error;
};

const deleteAllUserSkill = async () => {
  const { error } = await supabase
    .from("user_skill")
    .delete()
    .neq("user_id", "");
  if (error) throw error;
};

try {
  await deleteAllUsers();
  await deleteAllUserSkill();
} catch (e) {
  console.log(e);
}
