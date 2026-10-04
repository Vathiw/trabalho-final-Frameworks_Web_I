import { Alert, Box, Button, CircularProgress } from '@mui/material';

export function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <CircularProgress />
    </Box>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <Alert severity="error" action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Tentar de novo</Button>}>
      {message}
    </Alert>
  );
}
