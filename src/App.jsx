import { useEffect, useState } from 'react';
import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: '42071ed7-1765-42d0-80f2-c010f7c98927' })

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    pokemon.card.where({ pageSize: 20, page: 1 })
      .then(result => {
        result.data.map(card => {
          setCards(cards => [...cards, card]);})
      })
  }, []);

  return (
    <div>
      <h1>Pokemon TCG Sets</h1>
      {cards.map((card, index) => (
        <div key={index}>
          <h2>{card.name}</h2>
          <img src={card.images.small} alt={card.name} />
        </div>
      ))}
    </div>
  );
}

export default App;