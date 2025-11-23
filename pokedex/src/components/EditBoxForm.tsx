import { useState } from "react";
import type { BoxEntry } from "../types/types";
import { Modal } from "./Modal";

interface EditBoxFormProps {
  entry: BoxEntry;
  onSubmit: (data: Partial<BoxEntry>) => void;
  onCancel: () => void;
}

export function EditBoxForm({ entry, onSubmit, onCancel }: EditBoxFormProps) {
  const [location, setLocation] = useState(entry.location);
  const [level, setLevel] = useState(entry.level);
  const [note, setNote] = useState(entry.notes || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      location,
      level,
      notes: note,
    });
  }

  return (
    <Modal isOpen={true} onClose={onCancel} title={`Edit ${entry.id}`}>
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
            Notes:
            <input
              placeholder="Optional notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Save</button>
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "8px" }}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}
