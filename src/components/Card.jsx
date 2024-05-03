import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import PropTypes from 'prop-types';

const PokemonCard = ({ card }) => {
  return (
    <Card sx={{ width: '220px' }}>
      <div>
        <Typography level="title-lg">{card.name}</Typography>
        <Typography level="body-sm">{card.set.name}</Typography>
        <IconButton
          aria-label="bookmark this card"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <img
        src={card.images.small}
        loading="lazy"
        alt={card.name}
        style={{ height: '250px', width: 'auto', objectFit: 'contain' }}
      />
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography textAlign={'left'} fontSize="lg" fontWeight="lg">
            {card.cardmarket.prices.trendPrice}€
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore this card"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}

PokemonCard.propTypes = {
  card: PropTypes.object.isRequired,
};

export default PokemonCard;