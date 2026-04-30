import { Provider } from "../components/ui/provider";
import { Home } from "../pages/Home";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Home", () => {
  beforeEach(() => {
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
});
