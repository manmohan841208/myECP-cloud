import React from "react";
import { render, screen } from "@testing-library/react";
import HorizontalStepper from "./index";

describe("HorizontalStepper Component", () => {
    it("renders all step circles", () => {
        render(<HorizontalStepper />);
        const steps = screen.getAllByText(/Step/);
        expect(steps).toHaveLength(4);
        expect(steps[0]).toHaveTextContent("Step 1");
        expect(steps[1]).toHaveTextContent("Step 2");
        expect(steps[2]).toHaveTextContent("Step 3");
        expect(steps[3]).toHaveTextContent("Step 4");
    });

    it("renders the red intersecting line", () => {
        render(<HorizontalStepper />);
        const lineElement = screen.getByText("sdfs");
        expect(lineElement).toBeInTheDocument();
        expect(lineElement).toHaveClass("bg-red-500");
    });

    it("renders the first step as active (green background)", () => {
        render(<HorizontalStepper />);
        const firstStep = screen.getByText(/Step 1/).closest("div");
        expect(firstStep).toHaveClass("bg-[#43880f]");
    });

    it("renders other steps as inactive (white background)", () => {
        render(<HorizontalStepper />);
        const otherSteps = screen.getAllByText(/Step/).slice(1).map(step => step.closest("div"));
        otherSteps.forEach(step => {
            expect(step).toHaveClass("bg-white");
        });
    });
});