export interface CreateUserValues {
  profile: string[];
  email: string;
  password: string;
  nickname: string;
  checkPassword?: string | undefined;
  isSeller?: boolean | undefined;
}

export interface CreateProductsValues {
  productName: string;
  productQuantity: string;
  productPrice: string;
  productDescription?: string | undefined;
  images: string[];
}
