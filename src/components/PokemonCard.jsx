import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api.js';

export default function PokemonCard({ pokemon }) {
  return (
    <Card elevation={2}>
      <CardActionArea component={Link} to={`/pokemon/${pokemon.id}`}>
        <CardMedia component="img" image={imageUrl(pokemon.id)} alt={pokemon.name} loading="lazy" sx={{ height: 150, objectFit: 'contain', p: 1, bgcolor: '#fff' }} />
        <CardContent>
          <Typography variant="caption" color="text.secondary">#{String(pokemon.id).padStart(4, '0')}</Typography>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>{pokemon.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
