const BASE_URL = "https://hw4.cis1962.esinx.net/api";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJwZW5ua2V5IjoicmVuYWxpIiwiaWF0IjoxNzU5MDk4MjE4LCJpc3MiOiJlZHU6dXBlbm46c2VhczpjaXMxOTYyIiwiYXVkIjoiZWR1OnVwZW5uOnNlYXM6Y2lzMTk2MiIsImV4cCI6MTc2NDI4MjIxOH0.7ce0H7dSIX9QDgsHvomGR3Zn8bXLpLSHMjTMBwP3x-A";

import type { BoxEntry, InsertBoxEntry, UpdateBoxEntry } from "../types/types";

export class PokemonAPI {

    // Pokemon Endpoints
    async listPokemon(limit: number, offset: number) {
        try {
            const result = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
            if (!result.ok) {
                throw new Error(`Failed to fetch Pokémon (${result.status})`);
            }
            return await result.json();
        } catch (err) {
            console.error("getPokemonPage error:", err);
            return null;
        }
    }

    async getPokemonByName(name: string) {
        try {
            const result = await fetch(`${BASE_URL}/pokemon/${name}`);
            if (!result.ok) {
                throw new Error(`Failed to fetch Pokémon (${result.status})`);
            }
            return await result.json();
        } catch (err) {
            console.error("getPokemonByName error:", err);
            return null;
        }
    }

    //Box Endpoints
    async listBoxEntries() {
        try {
            const result = await fetch(`${BASE_URL}/box/`, {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                }
            });
            if (!result.ok) {
                throw new Error(`Failed to fetch entries (${result.status})`);
            }
            return await result.json();
        } catch (err) {
            console.error("listBoxEntries error:", err);
            return null;
        }
    }

    async createBoxEntry(entry: InsertBoxEntry) {
        try {
            const result = await fetch(`${BASE_URL}/box/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            });
            if (!result.ok) {
                throw new Error(`Failed to create entry (${result.status})`);
            }
            const data: BoxEntry = await result.json();
            return data;
        } catch (err) {
            console.error("createBoxEntry error:", err);
            return null;
        }
    }

    async getBoxEntry(id: string) {
        try {
            const result = await fetch(`${BASE_URL}/box/${id}`, {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                },
            });
            if (!result.ok) {
                throw new Error(`Failed to get entry (${result.status})`);
            }
            const data: BoxEntry = await result.json();
            return data;
        } catch (err) {
            console.error("getBoxEntry error:", err);
            return null;
        }
    }

    async updateBoxEntry(id: string, entry: UpdateBoxEntry) {
        try {
            const result = await fetch(`${BASE_URL}/box/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            });
            if (!result.ok) {
                throw new Error(`Failed to update entry (${result.status})`);
            }
            const data: BoxEntry = await result.json();
            return data;
        } catch (err) {
            console.error("updateBoxEntry error:", err);
            return null;
        }
    }

    async deleteBoxEntry(id: string) {
        try {
            const result = await fetch(`${BASE_URL}/box/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                },
            });
            if (!result.ok) {
                throw new Error(`Failed to delete entry (${result.status})`);
            }
        } catch (err) {
            console.error("deleteBoxEntry error:", err);
            return null;
        }
    }

    async clearAllBoxEntries() {
        try {
            const result = await fetch(`${BASE_URL}/box/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                },
            });
            if (!result.ok) {
                throw new Error(`Failed to clear all entries (${result.status})`);
            }
        } catch (err) {
            console.error("clearAllBoxEntries error:", err);
            return null;
        }
    }
}