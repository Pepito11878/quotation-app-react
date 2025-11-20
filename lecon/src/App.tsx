import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

// Fonction pour récupérer les citations depuis localStorage
function getStoredCitations(): Quote[] {
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
}

export default function App() {
  const [citations, setCitations] = useState<Quote[]>(getStoredCitations);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(function saveToLocalStorage() {
    localStorage.setItem("citations", JSON.stringify(citations));
  }, [citations]);

  // Fonction classique pour ajouter une citation
  function addQuote(text: string, author: string) {
    setCitations([...citations, { text, author }]);
  }

  // Fonction classique pour supprimer une citation
  function deleteQuote(index: number) {
    setCitations(citations.filter(function (_, i) {
      return i !== index;
    }));
  }

  return (
    <div className="bg-[#121212] min-h-screen p-5">
      <Header count={citations.length} />
      <hr className="border-none h-0.5 bg-[#333] mt-8 mb-8" />
      <Form onAddQuote={addQuote} />

      <div className="flex flex-col gap-5 max-w-xl mx-auto">
        {citations.map(function(c, i) {
          return (
            <div
              key={i}
              className="bg-linear-to-tr from-[#1f1f2f] to-[#28283f] p-4 rounded-2xl border-l-4 border-[#ff6f61] shadow-md flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-white text-lg italic">{`“${c.text}”`}</p>
              <p className="text-yellow-500 font-bold text-right mt-1">{`— ${c.author}`}</p>
              <button
                onClick={function() { deleteQuote(i); }}
                className="self-end mt-2 text-[#ff6f61] border-2 border-[#ff6f61] px-3 py-1 rounded-lg text-sm hover:bg-[#ff6f61] hover:text-[#121212] transition hover:cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
