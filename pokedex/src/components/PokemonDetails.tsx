import type { Pokemon } from "../types/types";
import { Modal } from "./Modal";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
  onCatch: () => void;
}

export function PokemonDetails({ pokemon, isOpen, onClose, onCatch }: PokemonDetailsProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={pokemon.name}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: "110px" }} />
        <img src={pokemon.sprites.back_default} alt={pokemon.name} style={{ width: "110px" }} />
        <img src={pokemon.sprites.front_shiny} alt={pokemon.name} style={{ width: "110px" }} />
        <img src={pokemon.sprites.back_shiny} alt={pokemon.name} style={{ width: "110px" }} />
      </div>

      <h3>ID: {pokemon.id}</h3>
      <button onClick={() => onCatch()} style={{ marginBottom: "12px" }}>
        Catch
      </button>

      <h3>Types:</h3>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        {pokemon.types.map((t) => (
          <span
            key={t.name}
            style={{
              background: t.color,
              color: "white",
              padding: "3px 8px",
              borderRadius: "10px",
              fontSize: "0.8",
            }}
          >
            {t.name}
          </span>
        ))}
      </div>

      <h3>Description:</h3>
      <p>{pokemon.description}</p>

      <h3>Stats:</h3>
      <ul>
        <li>HP: {pokemon.stats.hp}</li>
        <li>Attack: {pokemon.stats.attack}</li>
        <li>Defense: {pokemon.stats.defense}</li>
        <li>Special Attack: {pokemon.stats.specialAttack}</li>
        <li>Special Defense: {pokemon.stats.specialDefense}</li>
        <li>Speed: {pokemon.stats.speed}</li>
      </ul>

      <h3>Moves:</h3>
        <ul style={{ paddingLeft: "20px" }}>
        {pokemon.moves.map((move) => (
            <li key={move.name} style={{ marginBottom: "4px" }}>
            <strong>{move.name}</strong>

            {typeof move.power === "number" && move.power > 0 && (
                <span> — {move.power} power</span>
            )}

            <span
                style={{
                marginLeft: "8px",
                background: move.type.color,
                color: "white",
                padding: "2px 6px",
                borderRadius: "8px",
                fontSize: "0.75rem",
                }}
            >
                {move.type.name}
            </span>
            </li>
        ))}
        </ul>

    </Modal>
  );
}
