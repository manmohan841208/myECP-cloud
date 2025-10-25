import React from "react";
import { render, screen } from "@testing-library/react";
import { DynamicTooltip } from "./index";

// Mock Tooltip components
jest.mock("@/components/ui/tooltip", () => ({
    TooltipProvider: ({ children }: any) => (
        <div data-testid="tooltip-provider">{children}</div>
    ),
    Tooltip: ({ children }: any) => (
        <div data-testid="tooltip">{children}</div>
    ),
    TooltipTrigger: ({ children }: any) => (
        <button data-testid="tooltip-trigger">{children}</button>
    ),
    TooltipContent: ({ children, className, side, align }: any) => (
        <div
            data-testid="tooltip-content"
            className={className}
            data-side={side}
            data-align={align}
        >
            {children}
        </div>
    ),
}));

describe("DynamicTooltip Component", () => {
    it("renders children inside TooltipTrigger", () => {
        render(<DynamicTooltip content="Tooltip Text">Trigger Button</DynamicTooltip>);
        expect(screen.getByTestId("tooltip-trigger")).toHaveTextContent("Trigger Button");
    });

    it("renders tooltip content correctly", () => {
        render(<DynamicTooltip content="Tooltip Text">Trigger Button</DynamicTooltip>);
        expect(screen.getByTestId("tooltip-content")).toHaveTextContent("Tooltip Text");
    });

    it("applies custom className to TooltipContent", () => {
        render(
            <DynamicTooltip content="Tooltip Text" className="custom-class">
                Trigger Button
            </DynamicTooltip>
        );
        expect(screen.getByTestId("tooltip-content")).toHaveClass("custom-class");
    });

    it("sets default side and align attributes", () => {
        render(<DynamicTooltip content="Tooltip Text">Trigger Button</DynamicTooltip>);
        const content = screen.getByTestId("tooltip-content");
        expect(content).toHaveAttribute("data-side", "top");
        expect(content).toHaveAttribute("data-align", "center");
    });

    it("sets custom side and align attributes", () => {
        render(
            <DynamicTooltip content="Tooltip Text" side="bottom" align="start">
                Trigger Button
            </DynamicTooltip>
        );
        const content = screen.getByTestId("tooltip-content");
        expect(content).toHaveAttribute("data-side", "bottom");
        expect(content).toHaveAttribute("data-align", "start");
    });
});