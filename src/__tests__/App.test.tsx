import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  test("renders heading and increments counter", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Get started" }),
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Count is 0/i });
    await userEvent.click(button);

    expect(
      screen.getByRole("button", { name: /Count is 1/i }),
    ).toBeInTheDocument();
  });
});
