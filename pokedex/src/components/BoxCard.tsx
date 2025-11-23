import type { BoxEntry, Pokemon } from "../types/types";

interface BoxCardProps {
  entry: BoxEntry;
  pokemon: Pokemon;
  onEdit: (entry: BoxEntry) => void;
  onDelete: (id: string) => void;
}

export function BoxCard({ entry, pokemon, onEdit, onDelete }: BoxCardProps) {
  const formattedDate = new Date(entry.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "12px",
        marginBottom: "12px",
        maxWidth: "260px",
      }}
    >
      <h2>{pokemon.name}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "100px", marginBottom: "10px" }}
      />

      <p><strong>Location:</strong> {entry.location}</p>
      <p><strong>Caught:</strong> {formattedDate}</p>
      <p><strong>Level:</strong> {entry.level}</p>
      {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onEdit(entry)} style={{ marginRight: "10px" }}>
          Edit
        </button>
        <button onClick={() => onDelete(entry.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
