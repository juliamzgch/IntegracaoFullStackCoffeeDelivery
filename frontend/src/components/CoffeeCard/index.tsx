import {Heart} from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { QuantityInput } from '../Form/QuantityInput'
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles'

type CoffeeCardProps = {
  coffee: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
    quantity: number
    favorite: boolean;
  },
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
  handleFavoriteCoffee: (id: string) => void
}

export function CoffeeCard({ coffee, incrementQuantity, decrementQuantity, handleFavoriteCoffee }: CoffeeCardProps) {
  const theme = useTheme();
  /**
   * Cor brancoa do coração quando o café não é favorito: theme.colors['base-card']
   * Cor vermelha do coração quando o café é favorito: "red" 
   * **/

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.title} />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span> // ✅ aqui tag já é string
        ))}
      </Tags>


      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{Number(coffee.price).toFixed(2)}</span>
        </Price>

        <Order $itemAdded={false}>
          <QuantityInput
            quantity={coffee.quantity }
            incrementQuantity={() => incrementQuantity(coffee.id)}
            decrementQuantity={() => decrementQuantity(coffee.id)}
          />

          <button onClick={() => {handleFavoriteCoffee(coffee.id)}}>
            <Heart size={22}  color={coffee.favorite ? 'red': theme.colors['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}