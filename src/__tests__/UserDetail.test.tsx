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
const mockSkills = [1, 3];

describe("UserDetail", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("名前が表示されている", async () => {
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
    const name = await screen.findByText("seri");
    expect(name).toBeInTheDocument();
  });
});
