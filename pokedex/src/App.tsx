import { useState, useEffect } from "react";
import type { Pokemon, BoxEntry } from "./types/types";
import { PokemonAPI } from "./api/PokemonAPI";
import { PokemonList } from "./components/PokemonList";
import { PokemonDetails } from "./components/PokemonDetails";
import { BoxForm } from "./components/BoxForm";
import { EditBoxForm } from "./components/EditBoxForm";
import { BoxList } from "./components/BoxList";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";

const api = new PokemonAPI();

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pokemonMap, setPokemonMap] = useState<Record<number, Pokemon>>({});
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCatchForm, setShowCatchForm] = useState(false);
  const [boxEntries, setBoxEntries] = useState<BoxEntry[]>([]);
  const [boxError, setBoxError] = useState<string | null>(null);
  const [view, setView] = useState<'pokemon' | 'box'>('pokemon');
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [editForm, setEditForm] = useState<BoxEntry | null>(null);
  const [deleteEntry, setDeleteEntry] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(null);

      const offset = (currentPage - 1) * itemsPerPage;
      const res = await api.listPokemon(itemsPerPage, offset);

      if (!res) {
        setError("Failed to load Pokemon");
        setLoading(false);
        return;
      }

      setPokemon(res);
      setTotalItems(874);

      setPokemonMap((prev) => {
        const updated = { ...prev };
        res.forEach((p: Pokemon) => {
          updated[p.id] = p;
        });
        return updated;
      });

      setLoading(false);
    }

    fetchPokemon();
  }, [currentPage]);

  useEffect(() => {
    async function fetchBox() {
      const ids = await api.listBoxEntries();
      if (!ids) return;

      const fullEntries: BoxEntry[] = [];
      for (const id of ids) {
        const entry = await api.getBoxEntry(id);
        if (entry) fullEntries.push(entry);
      }

      setBoxEntries(fullEntries);
    }

    fetchBox();
  }, []);

  async function refreshFullBox() {
    const ids = await api.listBoxEntries();
    if (!ids) {
      setBoxEntries([]);
      return;
    }

    const fullEntries: BoxEntry[] = [];
    for (const id of ids) {
      const entry = await api.getBoxEntry(id);
      if (entry) fullEntries.push(entry);
    }

    setBoxEntries(fullEntries);
  }

  async function handleSelectPokemon(p: Pokemon) {
    setLoading(true);
    const details = await api.getPokemonByName(p.name);

    if (!details) setError("Failed to load Pokemon details");
    else setPokemonDetails(details);

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {boxError && <p style={{ color: "red" }}>{boxError}</p>}

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView('pokemon')}>
          All Pokémon
        </button>
        <button onClick={() => setView('box')} style={{ marginLeft: 10 }}>
          My Box
        </button>
      </div>

      {view === 'pokemon' && !loading && !error && (
        <PokemonList
          pokemon={pokemon}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSelectPokemon={handleSelectPokemon}
        />
      )}

      {pokemonDetails && (
        <PokemonDetails
          pokemon={pokemonDetails}
          isOpen={true}
          onClose={() => setPokemonDetails(null)}
          onCatch={() => setShowCatchForm(true)}
        />
      )}

      {showCatchForm && pokemonDetails && (
        <BoxForm
          pokemon={pokemonDetails}
          onSubmit={async (data) => {
            setBoxError(null);

            const created = await api.createBoxEntry(data);
            if (!created) {
              setBoxError("Failed to create entry: invalid input or authentication error.");
              return;
            }

            await refreshFullBox();
            setShowCatchForm(false);
            setPokemonDetails(null);
          }}
          onCancel={() => setShowCatchForm(false)}
        />
      )}

      {editForm && (
        <EditBoxForm
          entry={editForm}
          onSubmit={async (updated) => {
            await api.updateBoxEntry(editForm.id, updated);
            await refreshFullBox();
            setEditForm(null);
          }}
          onCancel={() => setEditForm(null)}
        />
      )}
      {deleteEntry && (
      <ConfirmDeleteModal
        id={deleteEntry}
        onConfirm={async () => {
          await api.deleteBoxEntry(deleteEntry);
          await refreshFullBox();
          setDeleteEntry(null);
        }}
        onCancel={() => setDeleteEntry(null)}
      />
    )}

      {view === 'box' && (
        <>
          <h2>Your Box</h2>
          <BoxList
            entries={boxEntries}
            pokemonById={pokemonMap}
            onEdit={(entry) => setEditForm(entry)}
            onDelete={(id) => setDeleteEntry(id)}
          />
        </>
      )}
    </div>
  );
}
