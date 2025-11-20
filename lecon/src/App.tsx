import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

function App() {
  const [citations, setCitations] = useState<Quote[]>(() => {
    const stored = localStorage.getItem("citations");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Erreur parsing localStorage", e);
        return [];
      }
    }
    return [];
  });

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("citations", JSON.stringify(citations));
  }, [citations]);

  const addQuote = (text: string, author: string) => {
    setCitations([...citations, { text, author }]);
  };

  const deleteQuote = (index: number) => {
    setCitations(citations.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#121212] min-h-screen p-5">
      <Header count={citations.length} />
      <hr className="border-none h-0.5 bg-[#333] mt-8 mb-8" />
      <Form onAddQuote={addQuote} />

      <div className="flex flex-col gap-5 max-w-xl mx-auto">
        {citations.map((c, i) => (
          <div
            key={i}
            className="bg-linear-to-tr from-[#1f1f2f] to-[#28283f] p-4 rounded-2xl border-l-4 border-[#ff6f61] shadow-md flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-white text-lg italic">{`“${c.text}”`}</p>
            <p className="text-yellow-500 font-bold text-right mt-1">{`— ${c.author}`}</p>
            <button
              onClick={() => deleteQuote(i)}
              className="self-end mt-2 text-[#ff6f61] border-2 border-[#ff6f61] px-3 py-1 rounded-lg text-sm hover:bg-[#ff6f61] hover:text-[#121212] transition hover:cursor-pointer"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
