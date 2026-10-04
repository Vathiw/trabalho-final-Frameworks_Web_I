import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="*" element={<p>Página não encontrada.</p>} />
        </Routes>
      </Container>
    </>
  );
}
