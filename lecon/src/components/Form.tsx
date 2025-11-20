import React, { useState } from "react";

interface FormProps {
  onAddQuote: (text: string, author: string) => void;
}

// Composant Form en fonction classique
export function Form(props: FormProps) {
  const [quoteText, setQuoteText] = useState("");
  const [authorText, setAuthorText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (quoteText.trim() && authorText.trim()) {
      props.onAddQuote(quoteText.trim(), authorText.trim());
      setQuoteText("");
      setAuthorText("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e1e2f] p-8 md:p-10 max-w-md mx-auto mb-10 rounded-2xl shadow-lg flex flex-col gap-4"
    >
      <label className="text-gray-300 font-semibold">Entrez une citation</label>
      <input
        type="text"
        value={quoteText}
        onChange={function(e) { setQuoteText(e.target.value); }}
        className="p-4 rounded-lg bg-[#2a2a3d] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
        placeholder="Ex: La vie est belle"
      />

      <label className="text-gray-300 font-semibold mt-2">
        Entrez le nom de l'auteur
      </label>
      <input
        type="text"
        value={authorText}
        onChange={function(e) { setAuthorText(e.target.value); }}
        className="p-4 rounded-lg bg-[#2a2a3d] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
        placeholder="Ex: Victor Hugo"
      />

      <button
        type="submit"
        className="mt-4 bg-[#ff6f61] hover:bg-[#ff4f3d] text-white font-semibold text-lg py-3 rounded-full transition"
      >
        Ajouter
      </button>
    </form>
  );
}
