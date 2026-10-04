import axios from 'axios';

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2', timeout: 15000 });

const idFromUrl = (url) => Number(url.split('/').filter(Boolean).pop());

export const imageUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export async function getAllPokemon() {
  const { data } = await api.get('/pokemon', { params: { limit: 1025 } });
  return data.results.map((p) => ({ name: p.name, id: idFromUrl(p.url) }));
}

export async function getTypes() {
  const { data } = await api.get('/type');
  return data.results.map((t) => t.name).filter((n) => n !== 'unknown' && n !== 'shadow');
}

export async function getNamesByType(type) {
  const { data } = await api.get(`/type/${type}`);
  return new Set(data.pokemon.map((x) => x.pokemon.name));
}

export async function getNamesByGeneration(gen) {
  const { data } = await api.get(`/generation/${gen}`);
  return new Set(data.pokemon_species.map((x) => x.name));
}

export async function getPokemon(id) {
  const { data } = await api.get(`/pokemon/${id}`);
  return data;
}
