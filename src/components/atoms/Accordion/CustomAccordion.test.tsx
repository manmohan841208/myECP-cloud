import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomAccordion from "./index";

// Mock Radix Accordion components
jest.mock("@/components/ui/accordion", () => ({
    Accordion: ({ children, className }: any) => (
        <div data-testid="accordion" className={className}>
            {children}
        </div>
    ),
    AccordionItem: ({ children, className }: any) => (
        <div data-testid="accordion-item" className={className}>
            {children}
        </div>
    ),
    AccordionTrigger: ({ children, className }: any) => (
        <button data-testid="accordion-trigger" className={className}>
            {children}
        </button>
    ),
    AccordionContent: ({ children, className }: any) => (
        <div data-testid="accordion-content" className={className}>
            {children}
        </div>
    ),
}));

describe("CustomAccordion Component", () => {
    it("renders header and children", () => {
        render(<CustomAccordion header="Header" children="Content" />);
        expect(screen.getByTestId("accordion-trigger")).toHaveTextContent("Header");
        expect(screen.getByTestId("accordion-content")).toHaveTextContent("Content");
    });

    it("applies custom class names", () => {
        render(
            <CustomAccordion
                header="Header"
                children="Content"
                className="accordion-class"
                itemClassName="item-class"
                triggerClassName="trigger-class"
                contentClassName="content-class"
            />
        );
        expect(screen.getByTestId("accordion")).toHaveClass("accordion-class");
        expect(screen.getByTestId("accordion-item")).toHaveClass("item-class");
        expect(screen.getByTestId("accordion-trigger")).toHaveClass("trigger-class");
        expect(screen.getByTestId("accordion-content")).toHaveClass("content-class");
    });

    it("renders with defaultOpen set to true", () => {
        render(<CustomAccordion header="Header" children="Content" defaultOpen />);
        expect(screen.getByTestId("accordion-trigger")).toBeInTheDocument();
        expect(screen.getByTestId("accordion-content")).toBeInTheDocument();
    });

    it("renders with collapsible set to false", () => {
        render(<CustomAccordion header="Header" children="Content" collapsible={false} />);
        expect(screen.getByTestId("accordion")).toBeInTheDocument();
    });

    it("handles click on trigger (simulate open/close)", () => {
        render(<CustomAccordion header="Header" children="Content" />);
        const trigger = screen.getByTestId("accordion-trigger");
        fireEvent.click(trigger);
        expect(trigger).toBeInTheDocument(); // Just ensures click works without error
    });
});