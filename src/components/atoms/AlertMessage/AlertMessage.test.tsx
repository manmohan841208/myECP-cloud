import React from "react";
import { render, screen } from "@testing-library/react";
import CustomAlert from "./index";

// ✅ Correct mock for "@/components/ui/alert"
jest.mock("@/components/ui/alert", () => ({
    Alert: ({ children, className }: any) => (
        <div data-testid="alert" className={className}>
            {children}
        </div>
    ),
    AlertTitle: ({ children, className }: any) => (
        <div data-testid="alert-title" className={className}>
            {children}
        </div>
    ),
    AlertDescription: ({ children, className }: any) => (
        <div data-testid="alert-description" className={className}>
            {children}
        </div>
    ),
}));

describe("CustomAlert", () => {
    it("renders with default (info) type", () => {
        render(<CustomAlert title="Info" description="This is an info alert." />);
        expect(screen.getByTestId("alert")).toBeInTheDocument();
        expect(screen.getByTestId("alert-title")).toHaveTextContent("Info");
        expect(screen.getByTestId("alert-description")).toHaveTextContent(
            "This is an info alert."
        );
    });

    it("renders with error type", () => {
        render(
            <CustomAlert
                type="error"
                title="Error"
                description="This is an error alert."
            />
        );
        expect(screen.getByTestId("alert-title")).toHaveTextContent("Error");
        expect(screen.getByTestId("alert-description")).toHaveTextContent(
            "This is an error alert."
        );
    });

    it("renders with success type", () => {
        render(
            <CustomAlert
                type="success"
                title="Success"
                description="This is a success alert."
            />
        );
        expect(screen.getByTestId("alert-title")).toHaveTextContent("Success");
        expect(screen.getByTestId("alert-description")).toHaveTextContent(
            "This is a success alert."
        );
    });
});