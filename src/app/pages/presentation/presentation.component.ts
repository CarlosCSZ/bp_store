import { Component } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationComponent {

}
