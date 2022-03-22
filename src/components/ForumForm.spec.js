import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ForumForm from "./ForumForm";
import ForumContextProvider from "../contexts/ForumContextProvider";

describe("Render Home", () => {
  describe("Layout", () => {
    const renderComponent = () => {
    let rendered = render(
        <ForumContextProvider>
          <ForumForm />
        </ForumContextProvider>
        );    
      return rendered;
    }
    it("has forum header in home page", () => {
      renderComponent();
    });
  });
});
