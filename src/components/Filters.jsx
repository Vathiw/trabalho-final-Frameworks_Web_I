import { Grid, MenuItem, TextField } from '@mui/material';

const GENERATIONS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

export default function Filters({ search, type, gen, types, onSearch, onType, onGen }) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Buscar por nome" value={search} onChange={(e) => onSearch(e.target.value)} />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField select fullWidth label="Tipo" value={type} onChange={(e) => onType(e.target.value)}>
          <MenuItem value="">Todos</MenuItem>
          {types.map((t) => <MenuItem key={t} value={t} sx={{ textTransform: 'capitalize' }}>{t}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField select fullWidth label="Geração" value={gen} onChange={(e) => onGen(e.target.value)}>
          <MenuItem value="">Todas</MenuItem>
          {GENERATIONS.map((g, i) => <MenuItem key={g} value={i + 1}>Geração {g}</MenuItem>)}
        </TextField>
      </Grid>
    </Grid>
  );
}
