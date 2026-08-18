export interface Guitar {
  guitarId?: number;
  id?: number;
  brandId: number;
  bodyTypeId: number;
  model: string;
  year: number;
  price: number;
  size: 'Full' | '7/8' | '3/4' | '1/2';
  condition: 'Mint' | 'Excellent' | 'Good' | 'Fair';
  isSold: boolean | number;
  description?: string;
}

export interface Brand {
  brandId: number;
  name: string;
}

export interface BodyType {
  bodyTypeId: number;
  name: string;
}