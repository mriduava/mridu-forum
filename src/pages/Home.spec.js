import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";
import ForumContextProvider from "../contexts/ForumContextProvider";
import { MemoryRouter } from "react-router-dom";

describe("Render Home", () => {
  const renderComponent = () => {
    let rendered = render(
        <ForumContextProvider>
          <Home />
        </ForumContextProvider>,
        { wrapper: MemoryRouter }
      );    
    return rendered;
  }
  describe("Layout", () => {
    it("has forum header in home page", () => {
      renderComponent();
      const header1 = screen.getByTestId('header1');
      const header2 = screen.getByTestId('header2');
      expect(header1).toHaveTextContent(/forums/i);
      expect(header2).toHaveTextContent(/threads/i);
    });
  });
});
