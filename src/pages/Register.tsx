import type { formType } from "@/types/formType";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";

export const Register = () => {
  const { register, handleSubmit, control } = useForm<formType>();
  const skills = [
    { id: 1, name: "React" },
    { id: 2, name: "TypeScript" },
    { id: 3, name: "GitHub" },
  ];

  const onSubmit = (data: formType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="user_id">好きな英単語：</label>
      <input id="user_id" {...register("user_id")} />
      <label htmlFor="name">名前：</label>
      <input id="name" {...register("name")} />
      <label htmlFor="description">自己紹介：</label>
      <input id="description" {...register("description")} />
      <label htmlFor="skill">好きな技術：</label>

      <Controller
        name="skill"
        control={control}
        render={({ field }) => (
          <ReactSelect
            isMulti
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

      <label htmlFor="github_id">GitHub ユーザー名：</label>
      <input id="github_id" {...register("github_id")} />
      <label htmlFor="qiita_id">Qiita URL：</label>
      <input id="qiita_id" {...register("qiita_id")} />
      <label htmlFor="x_id">X URL：</label>
      <input id="x_id" {...register("x_id")} />
      <button type="submit">送信</button>
    </form>
  );
};
