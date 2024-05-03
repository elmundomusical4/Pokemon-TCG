import { useEffect, useState, useRef, useCallback } from 'react';
import pokemon from 'pokemontcgsdk';
import PokemonCard from './components/Card.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css'

pokemon.configure({ apiKey: '42071ed7-1765-42d0-80f2-c010f7c98927' })

const App = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMore = useCallback(() => {
    setPage((prevPageNumber) => prevPageNumber + 1);
  }, []);

  useEffect(() => {
    const currentLoader = loader.current;
    const observer = new IntersectionObserver(handleObserver, { root: null, rootMargin: "20px", threshold: 1.0 });
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqueCards = {};
  cards.forEach(card => {
    uniqueCards[card.id] = card;
  });

  useEffect(() => {
    pokemon.card.where({ pageSize: 30, page: page })
      .then(result => {
        const uniqueCards = {};
        result.data.forEach(card => {
          uniqueCards[card.id] = card;
        });
        setCards((prevCards) => [...prevCards, ...Object.values(uniqueCards)]);
      })
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loadMore();
    }
  }

  return (
    <div>
      <h1>Pokemon TCG Sets</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 220px))',
        gap: '1rem',
        justifyContent: 'center',
        width: '100%',
      }}>
        {Object.values(uniqueCards).map((card) => (
          <div key={card.id}>
            <PokemonCard card={card} />
          </div>
        ))}
      </div>
      <div ref={loader} style={{ margin: '1rem' }}>
        <CircularProgress ref={loader} color="secondary" />
      </div>
    </div>
  );
}

export default App;