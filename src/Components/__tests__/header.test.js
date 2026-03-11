// src/Components/__tests__/header.test.js
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utilis/appStore";
import { BrowserRouter } from "react-router-dom";
import * as DarkModeContext from "../DarkModeContext";

jest.spyOn(DarkModeContext, "useDarkMode").mockReturnValue({
  isDark: false,
  toggleDark: jest.fn(),
});

it("should load header component with login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});