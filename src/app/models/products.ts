import { FormControl } from "@angular/forms";

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

interface ProductForm {
  id: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  logo: FormControl<string>;
  date_release: FormControl<string>;
  date_revision: FormControl<string>;
}

export { Product, UpdateProduct, ProductForm };
