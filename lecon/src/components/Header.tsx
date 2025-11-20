import type React from "react";

interface HeaderProps {
  count: number;
}

export const Header: React.FC<HeaderProps> = ({ count }) => {
  return (
    <header>
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#ff6f61] tracking-wide">
          Mes citations
        </h1>
        <h2 className="text-lg text-gray-400 mt-1">
          Gestionnaire de citations en ligne
        </h2>
        <h3 className="text-sm text-gray-500 mt-1">{count} citation(s)</h3>
      </header>
    </header>
  );
};
