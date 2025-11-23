import type { Pokemon, BoxEntry } from "../types/types";
import { BoxCard } from "../components/BoxCard";

interface BoxListProps {
    entries: BoxEntry[];
    pokemonById: Record<number, Pokemon>;
    onEdit: (entry: BoxEntry) => void;
    onDelete: (id: string) => void;
}

export function BoxList({ entries, pokemonById, onEdit, onDelete }: BoxListProps) {
    if (entries.length === 0) {
        return <p>No Pokémon caught yet.</p>;
    }

    return (
        <div>
            {entries.map((entry) => {
                const pokemon = pokemonById[entry.pokemonId];
                if (!pokemon) return null;

                return (
                    <BoxCard
                        key={entry.id}
                        entry={entry}
                        pokemon={pokemon}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
}
