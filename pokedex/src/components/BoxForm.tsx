import type { Pokemon, InsertBoxEntry } from "../types/types";
import { useState } from "react";
import { Modal } from "../components/Modal";

interface BoxFormProps {
  pokemon: Pokemon;
  onSubmit: (data: InsertBoxEntry) => void;
  onCancel: () => void;
}

export function BoxForm({ pokemon, onSubmit, onCancel }: BoxFormProps) {
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState(1);
  const [date, setDate] = useState(new Date().toISOString());
  const [note, setNote] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const entry: InsertBoxEntry = {
      location,
      level,
      createdAt: new Date().toISOString(),
      notes: note,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      pokemonSprite: pokemon.sprites.front_default,
    };

    onSubmit(entry);
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={`Catch ${pokemon.name}`}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}>
          <label>
            Location:
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label>
            Date:
            <input
              type="datetime-local"
              value={date.slice(0, 16)}
              onChange={(e) => setDate(new Date(e.target.value).toISOString())}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label>
            Level:
            <input
              type="number"
              min={1}
              max={100}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label>
            Note:
            <input
              placeholder="Optional Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Add</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}

