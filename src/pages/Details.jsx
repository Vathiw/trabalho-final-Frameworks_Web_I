import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { ErrorMessage, Loading } from '../components/Feedback.jsx';
import { getPokemon, imageUrl } from '../services/api.js';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getPokemon(id)
      .then(setPokemon)
      .catch((e) => setError(e.response?.status === 404 ? 'Pokémon não encontrado.' : 'Erro ao carregar os detalhes.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Voltar</Button>
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {pokemon && (
        <Card>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              <Box component="img" src={imageUrl(pokemon.id)} alt={pokemon.name} sx={{ width: { xs: 220, md: 320 } }} />
              <Box sx={{ flex: 1, width: '100%' }}>
                <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>{pokemon.name} <small>#{pokemon.id}</small></Typography>
                <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                  {pokemon.types.map((t) => <Chip key={t.type.name} label={t.type.name} color="primary" sx={{ textTransform: 'capitalize' }} />)}
                </Stack>
                <Typography>Altura: {pokemon.height / 10} m | Peso: {pokemon.weight / 10} kg</Typography>
                <Typography sx={{ mb: 2, textTransform: 'capitalize' }}>Habilidades: {pokemon.abilities.map((a) => a.ability.name).join(', ')}</Typography>
                {pokemon.stats.map((s) => (
                  <Box key={s.stat.name} sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{s.stat.name}: {s.base_stat}</Typography>
                    <LinearProgress variant="determinate" value={Math.min(s.base_stat / 2, 100)} />
                  </Box>
                ))}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
}
