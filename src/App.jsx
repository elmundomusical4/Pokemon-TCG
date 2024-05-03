import { useEffect, useState } from 'react';
import pokemon from 'pokemontcgsdk';
import PokemonCard from './components/Card.jsx';
import './App.css'

pokemon.configure({ apiKey: '42071ed7-1765-42d0-80f2-c010f7c98927' })

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    pokemon.card.where({ pageSize: 12, page: 1 })
      .then(result => {
        const uniqueCards = {};
        result.data.forEach(card => {
          uniqueCards[card.id] = card;
        });
        setCards(Object.values(uniqueCards));
      })
  }, []);

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
        {cards.map((card) => (
          <div key={card.id}>
            <PokemonCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;