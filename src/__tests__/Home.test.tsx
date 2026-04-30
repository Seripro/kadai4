import { getAllUsers } from "../utils/supabaseFunctions";
import { Provider } from "../components/ui/provider";
import { Home } from "../pages/Home";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

jest.mock("../utils/supabaseFunctions", () => ({
  getAllUsers: jest.fn(),
}));

const mockUsers = [
  {
    description: "よろしくお願いします！",
    github_id: "Seripro",
    name: "seri",
    qiita_id: "https://qiita.com/keikeigo",
    user_id: "apple",
    x_id: "https://x.com/keikeigokeigo",
  },
];

describe("Home", () => {
  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);
    render(
      <Provider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  });
  it("タイトルが表示されている", async () => {
    const title = await screen.findByRole("heading");
    expect(title).toBeInTheDocument();
  });
  it("IDを入力してボタンを押すと名刺ページに遷移する", async () => {
    const input = await screen.findByRole("textbox");
    fireEvent.change(input, { target: { value: "apple" } });
    const button = await screen.findByText("表示する");
    fireEvent.click(button);
    await waitFor(() =>
      expect(mockedNavigator).toHaveBeenCalledWith("/cards/apple"),
    );
  });
  it("IDを入力せずにボタンを押すとエラーになる", async () => {
    const button = await screen.findByText("表示する");
    fireEvent.click(button);
    const error = await screen.findByText("IDを入力して下さい");
    expect(error).toBeInTheDocument();
  });
  it("存在しないIDを入力し、ボタンを押すとエラーになる", async () => {
    const input = await screen.findByRole("textbox");
    fireEvent.change(input, { target: { value: "banana" } });
    const button = await screen.findByText("表示する");
    fireEvent.click(button);
    const error = await screen.findByText("そのIDは存在しません");
    expect(error).toBeInTheDocument();
  });
});
