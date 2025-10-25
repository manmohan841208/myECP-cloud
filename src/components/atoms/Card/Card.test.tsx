import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("Card Component", () => {
    it("renders children content", () => {
        render(<Card>Card Content</Card>);
        expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("renders header when provided", () => {
        render(<Card header="Card Header">Card Content</Card>);
        expect(screen.getByText("Card Header")).toBeInTheDocument();
        expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("applies custom headerClassName to header", () => {
        render(
            <Card header="Header" headerClassName="header-class">
                Card Content
            </Card>
        );
        const headerElement = screen.getByText("Header").closest("div");
        expect(headerElement).toHaveClass("header-class");
    });

    it("does not render header if not provided", () => {
        render(<Card>Card Content</Card>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
});