import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VariantAlert } from "./index";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Info: () => <svg data-testid="icon-info" />,
    AlertCircle: () => <svg data-testid="icon-error" />,
    CheckCircle: () => <svg data-testid="icon-success" />,
    X: () => <svg data-testid="icon-close" />,
}));

describe("VariantAlert Component", () => {
    it("renders with default (info) variant", () => {
        render(<VariantAlert title="Info Title" description="Info Description" />);
        expect(screen.getByText("Info Title")).toBeInTheDocument();
        expect(screen.getByText("Info Description")).toBeInTheDocument();
        expect(screen.getByTestId("icon-info")).toBeInTheDocument();
    });

    it("renders with error variant", () => {
        render(
            <VariantAlert
                variant="error"
                title="Error Title"
                description="Error Description"
            />
        );
        expect(screen.getByText("Error Title")).toBeInTheDocument();
        expect(screen.getByText("Error Description")).toBeInTheDocument();
        expect(screen.getByTestId("icon-error")).toBeInTheDocument();
    });

    it("renders with success variant", () => {
        render(
            <VariantAlert
                variant="success"
                title="Success Title"
                description="Success Description"
            />
        );
        expect(screen.getByText("Success Title")).toBeInTheDocument();
        expect(screen.getByText("Success Description")).toBeInTheDocument();
        expect(screen.getByTestId("icon-success")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        const onCloseMock = jest.fn();
        render(
            <VariantAlert
                title="Closable"
                description="With close button"
                onClose={onCloseMock}
            />
        );
        const closeButton = screen.getByRole("button");
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

});