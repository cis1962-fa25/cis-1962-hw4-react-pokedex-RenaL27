import type { Pokemon } from "../types/types";
interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({pokemon, onClick}: PokemonCardProps) {
  return (
    <div onClick={onClick}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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
    </div>
  )
}