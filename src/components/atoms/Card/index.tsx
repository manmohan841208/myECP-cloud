import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  headerClassName?: string;
}

const Card: React.FC<CardProps> = ({ children, className, header, headerClassName }) => {
  return (
    <div className={`card bg-[var(--card-background)] rounded ${className || ""}`}>
      {header && (
        <div
          className={`bg-[var(--color-blue)] border-b-[1.5px] border-[var(--secondary-border)] text-[var(--text-white)] pl-3 w-full rounded-t-[8px] py-[5.5px] ${headerClassName || ""}`}
        >
          <h2 className="text-xl font-semibold">{header}</h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
