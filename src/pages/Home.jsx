import { useEffect, useMemo, useState } from 'react';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import Filters from '../components/Filters.jsx';
import PokemonCard from '../components/PokemonCard.jsx';
import { ErrorMessage, Loading } from '../components/Feedback.jsx';
import { getAllPokemon, getNamesByGeneration, getNamesByType, getTypes } from '../services/api.js';

const PER_PAGE = 20;

export default function Home() {
  const [all, setAll] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Estados dos filtros e da paginação
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [gen, setGen] = useState('');
  const [page, setPage] = useState(1);
  const [typeNames, setTypeNames] = useState(null);
  const [genNames, setGenNames] = useState(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([getAllPokemon(), getTypes()])
      .then(([list, t]) => { setAll(list); setTypes(t); })
      .catch(() => setError('Não foi possível carregar os Pokémon. Verifique sua conexão.'))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    if (!type) return setTypeNames(null);
    getNamesByType(type).then(setTypeNames).catch(() => setError('Erro ao aplicar o filtro de tipo.'));
  }, [type]);

  useEffect(() => {
    if (!gen) return setGenNames(null);
    getNamesByGeneration(gen).then(setGenNames).catch(() => setError('Erro ao aplicar o filtro de geração.'));
  }, [gen]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((p) =>
      p.name.includes(q) && (!typeNames || typeNames.has(p.name)) && (!genNames || genNames.has(p.name)));
  }, [all, search, typeNames, genNames]);

  // Sempre que algum filtro muda, volta para a página 1
  const change = (setter) => (v) => { setter(v); setPage(1); };

  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <>
      <Filters search={search} type={type} gen={gen} types={types}
        onSearch={change(setSearch)} onType={change(setType)} onGen={change(setGen)} />
      {loading ? <Loading /> : error ? <ErrorMessage message={error} onRetry={() => setReload((r) => r + 1)} /> : (
        <>
          <Typography sx={{ mb: 2 }} color="text.secondary">{filtered.length} Pokémon encontrados</Typography>
          {filtered.length === 0 && <Typography>Nenhum resultado para os filtros selecionados.</Typography>}
          <Grid container spacing={2}>
            {pageItems.map((p) => (
              <Grid item xs={6} sm={4} md={3} key={p.id}><PokemonCard pokemon={p} /></Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" siblingCount={0} />
            </Stack>
          )}
        </>
      )}
    </>
  );
}
