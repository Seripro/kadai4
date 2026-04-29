import type { formType } from "@/types/formType";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import ReactSelect from "react-select";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import { insertUser, insertUserSkill } from "@/utils/supabaseFunctions";
import type { User } from "@/types/userTypes";
import type { UserSkill } from "@/types/userSkillType";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formType>();
  const navigate = useNavigate();
  const skills = [
    { id: 1, name: "React" },
    { id: 2, name: "TypeScript" },
    { id: 3, name: "GitHub" },
    { id: 4, name: "Python" },
    { id: 5, name: "HTML" },
  ];

  const createUser = async (user: User) => {
    try {
      await insertUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const createUserSkill = async (userSkill: UserSkill) => {
    try {
      await insertUserSkill(userSkill);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit: SubmitHandler<formType> = (data) => {
    console.log(data);
    const user = {
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      github_id: data.github_id,
      qiita_id: data.qiita_id,
      x_id: data.x_id,
    };
    data.skill.map((item) => {
      const userSkill = {
        user_id: data.user_id,
        skill_id: item,
      };
      createUserSkill(userSkill);
    });
    createUser(user);
    navigate("/");
  };
  return (
    <Flex minH="100vh" align="center" justify="center" p={4} bg="gray.50">
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        maxW="sm"
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={8}
      >
        <Heading as="h1" size="lg" mb={6} textAlign="left">
          名刺新規登録
        </Heading>
        <Stack gap={4}>
          <Box>
            <label
              htmlFor="user_id"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              好きな英単語：
            </label>
            <Input
              id="user_id"
              {...register("user_id", {
                required: "必須項目です",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "アルファベットを入力して下さい",
                },
              })}
            />
            {errors.user_id && (
              <Text color="red.500" fontSize="sm" style={{ textAlign: "left" }}>
                {errors.user_id?.message}
              </Text>
            )}
          </Box>

          <Box>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              名前：
            </label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && (
              <Text color="red.500" fontSize="sm" style={{ textAlign: "left" }}>
                必須項目です
              </Text>
            )}
          </Box>

          <Box>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              自己紹介：
            </label>
            <Input
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <Text color="red.500" fontSize="sm" style={{ textAlign: "left" }}>
                必須項目です
              </Text>
            )}
          </Box>

          <Box>
            <label
              htmlFor="skill"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              好きな技術：
            </label>
            <Controller
              name="skill"
              control={control}
              rules={{ required: "必須項目です" }}
              render={({ field }) => (
                <ReactSelect
                  inputId="skill"
                  isMulti
                  placeholder=""
                  options={skills?.map((s) => ({ label: s.name, value: s.id }))}
                  // フォームの number[] → ReactSelectの {label, value}[] に変換
                  value={skills
                    ?.filter((s) => field.value?.includes(s.id))
                    .map((s) => ({ label: s.name, value: s.id }))}
                  // ReactSelectの {label, value}[] → フォームの number[] に変換
                  onChange={(selected) => {
                    field.onChange(selected.map((s) => s.value));
                  }}
                />
              )}
            />
            {errors.skill && (
              <Text color="red.500" fontSize="sm" style={{ textAlign: "left" }}>
                必須項目です
              </Text>
            )}
          </Box>

          <Box>
            <label
              htmlFor="github_id"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              GitHub ユーザー名：
            </label>
            <Input id="github_id" {...register("github_id")} />
          </Box>

          <Box>
            <label
              htmlFor="qiita_id"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              Qiita URL：
            </label>
            <Input id="qiita_id" {...register("qiita_id")} />
          </Box>

          <Box>
            <label
              htmlFor="x_id"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              X URL：
            </label>
            <Input id="x_id" {...register("x_id")} />
          </Box>

          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            mt={4}
            variant="surface"
            colorPalette="green"
          >
            登録
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
