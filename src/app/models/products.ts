interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

interface UpdateProduct extends Partial<Product> {
  id: string;
}

export { Product, UpdateProduct };
