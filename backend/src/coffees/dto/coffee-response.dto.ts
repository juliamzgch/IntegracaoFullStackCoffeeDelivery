export class CoffeeResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  tags: { id: string; name: string }[];
} 