import type { Pokemon } from "../types/types";
import { PokemonCard }  from "../components/PokemonCard";
interface PokemonListProps {
  pokemon: Pokemon[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectPokemon: (p: Pokemon) => void;
}

export function PokemonList( 
    {
        pokemon, 
        totalItems, 
        itemsPerPage, 
        currentPage, 
        onPageChange, 
        onSelectPokemon
    }: PokemonListProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
    <div>
        <div>
            {pokemon.map((p) => (
                <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={() => onSelectPokemon(p)}
                />
                ))}
        </div>
        <div>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>

        <span>{currentPage} / {totalPages}</span>

        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}