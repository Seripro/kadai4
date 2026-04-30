import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getSkillsByUserId, getUserById } from "../utils/supabaseFunctions";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserDetail } from "../pages/UserDetail";
import { Provider } from "../components/ui/provider";

jest.mock("../utils/supabaseFunctions", () => ({
  getUserById: jest.fn(),
  getSkillsByUserId: jest.fn(),
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

describe("UserDetail", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (getUserById as jest.Mock).mockResolvedValueOnce(mockUser);
    (getSkillsByUserId as jest.Mock).mockResolvedValueOnce(mockSkills);

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/apple"]}>
          <Routes>
            <Route path="/cards/:id" element={<UserDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  });
  it("名前が表示されている", async () => {
    const name = await screen.findByText("seri");
    expect(name).toBeInTheDocument();
  });
  it("自己紹介が表示されている", async () => {
    const description = await screen.findByText("よろしくお願いします！");
    expect(description).toBeInTheDocument();
  });
  it("技術が表示されている", async () => {
    const skill1 = await screen.findByText("React");
    const skill2 = await screen.findByText("GitHub");
    expect(skill1).toBeInTheDocument();
    expect(skill2).toBeInTheDocument();
  });
  it("GitHubのアイコンが表示されている", async () => {
    const GitHubIcon = await screen.findByAltText("GitHubのアイコン");
    expect(GitHubIcon).toBeInTheDocument();
  });
  it("Qiitaのアイコンが表示されている", async () => {
    const QiitaIcon = await screen.findByAltText("Qiitaのアイコン");
    expect(QiitaIcon).toBeInTheDocument();
  });
  it("Xのアイコンが表示されている", async () => {
    const XIcon = await screen.findByAltText("Xのアイコン");
    expect(XIcon).toBeInTheDocument();
  });
});
