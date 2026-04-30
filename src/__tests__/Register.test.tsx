import { Provider } from "../components/ui/provider";
import { Register } from "../pages/Register";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Register", () => {
  it("タイトルが表示されている", async () => {
    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/register"]}>
          <Routes>
            <Route path="/cards/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    const title = await screen.findByRole("heading");
    expect(title).toBeInTheDocument();
  });
});
