export class CartItemResponseDto {
  id: string;
  coffee: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export class CartResponseDto {
  id: string;
  items: CartItemResponseDto[];
  itemsTotal: number;
  uniqueCategories: string[];
  shippingFee: number;
  total: number;
} 