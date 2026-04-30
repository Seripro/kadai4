import { insertUser, insertUserSkill } from "../utils/supabaseFunctions";
import { Provider } from "../components/ui/provider";
import { Register } from "../pages/Register";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../utils/supabaseFunctions", () => ({
  insertUser: jest.fn(),
  insertUserSkill: jest.fn(),
}));

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

const mockUser = {
  description: "よろしくお願いします！",
  github_id: "Seripro",
  name: "seri",
  qiita_id: "https://qiita.com/keikeigo",
  user_id: "apple",
  x_id: "https://x.com/keikeigokeigo",
};
const mockSkills = [
  { id: 1, name: "React" },
  { id: 3, name: "GitHub" },
];

describe("Register", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (insertUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (insertUserSkill as jest.Mock).mockResolvedValueOnce(mockSkills);
    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/register"]}>
          <Routes>
            <Route path="/cards/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  });
  it("タイトルが表示されている", async () => {
    const title = await screen.findByRole("heading");
    expect(title).toBeInTheDocument();
  });
  it("全項目を入力して登録ボタンを押すとホームに遷移する", async () => {
    const user = userEvent.setup();
    const user_idInput = await screen.findByLabelText("好きな英単語：");
    const nameInput = await screen.findByLabelText("名前：");
    const descriptionInput = await screen.findByLabelText("自己紹介：");
    const skillSelect = await screen.findByLabelText("好きな技術：");
    const githubInput = await screen.findByLabelText("GitHub ユーザー名：");
    const qiitaInput = await screen.findByLabelText("Qiita URL：");
    const xInput = await screen.findByLabelText("X URL：");

    fireEvent.change(user_idInput, { target: { value: mockUser.user_id } });
    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(descriptionInput, {
      target: { value: mockUser.description },
    });
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][Enter]");
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][ArrowDown][Enter]");
    fireEvent.change(githubInput, { target: { value: mockUser.github_id } });
    fireEvent.change(qiitaInput, { target: { value: mockUser.qiita_id } });
    fireEvent.change(xInput, { target: { value: mockUser.x_id } });

    const button = await screen.findByText("登録");
    await user.click(button);
    await waitFor(() => expect(mockedNavigator).toHaveBeenCalledWith("/"));
  });
  it("オプションを入力しなくても登録できる", async () => {
    const user = userEvent.setup();
    const user_idInput = await screen.findByLabelText("好きな英単語：");
    const nameInput = await screen.findByLabelText("名前：");
    const descriptionInput = await screen.findByLabelText("自己紹介：");
    const skillSelect = await screen.findByLabelText("好きな技術：");

    fireEvent.change(user_idInput, { target: { value: mockUser.user_id } });
    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(descriptionInput, {
      target: { value: mockUser.description },
    });
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][Enter]");
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][ArrowDown][Enter]");

    const button = await screen.findByText("登録");
    await user.click(button);
    await waitFor(() => expect(mockedNavigator).toHaveBeenCalledWith("/"));
  });
  it("好きな英単語を入力しないとエラーになる", async () => {
    const user = userEvent.setup();
    const nameInput = await screen.findByLabelText("名前：");
    const descriptionInput = await screen.findByLabelText("自己紹介：");
    const skillSelect = await screen.findByLabelText("好きな技術：");

    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(descriptionInput, {
      target: { value: mockUser.description },
    });
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][Enter]");
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][ArrowDown][Enter]");

    const button = await screen.findByText("登録");
    await user.click(button);
    const error = await screen.findByText("必須項目です");
    expect(error).toBeInTheDocument();
  });
  it("好きな英単語がアルファベットでないとエラーになる", async () => {
    const user = userEvent.setup();
    const user_idInput = await screen.findByLabelText("好きな英単語：");
    const nameInput = await screen.findByLabelText("名前：");
    const descriptionInput = await screen.findByLabelText("自己紹介：");
    const skillSelect = await screen.findByLabelText("好きな技術：");

    fireEvent.change(user_idInput, { target: { value: 123 } });
    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(descriptionInput, {
      target: { value: mockUser.description },
    });
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][Enter]");
    await user.click(skillSelect);
    await user.keyboard("[ArrowDown][ArrowDown][Enter]");

    const button = await screen.findByText("登録");
    await user.click(button);
    const error = await screen.findByText("アルファベットを入力して下さい");
    expect(error).toBeInTheDocument();
  });
});
