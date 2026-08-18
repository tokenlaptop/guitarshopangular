import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuitarService } from './guitar.service';
import { Guitar, Brand, BodyType } from './guitar.model';

@Component({
  selector: 'app-guitar-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guitar-manager.component.html',
  styleUrls: ['./guitar-manager.component.css']
})
export class GuitarManagerComponent implements OnInit {
  guitars: Guitar[] = [];
  selectedGuitar: Guitar = this.getEmptyGuitar();
  isEditing: boolean = false;

  // Dropdown lookup tables from DB
  brands: Brand[] = [
    { brandId: 1, name: 'Fender' },
    { brandId: 2, name: 'Gibson' },
    { brandId: 3, name: 'PRS' },
    { brandId: 4, name: 'Martin' }
  ];

  bodyTypes: BodyType[] = [
    { bodyTypeId: 1, name: 'Stratocaster' },
    { bodyTypeId: 2, name: 'Les Paul' },
    { bodyTypeId: 3, name: 'Dreadnought' }
  ];

  sizes: Array<'Full' | '7/8' | '3/4' | '1/2'> = ['Full', '7/8', '3/4', '1/2'];
  conditions: Array<'Mint' | 'Excellent' | 'Good' | 'Fair'> = ['Mint', 'Excellent', 'Good', 'Fair'];

  constructor(private guitarService: GuitarService) {}

  ngOnInit(): void {
    this.loadGuitars();
  }

  loadGuitars(): void {
    this.guitarService.getGuitars().subscribe({
      next: (data) => (this.guitars = data),
      error: (err) => console.error('Failed to fetch guitars', err)
    });
  }

  onSubmit(): void {
    // Cast numeric select values from strings
    this.selectedGuitar.brandId = Number(this.selectedGuitar.brandId);
    this.selectedGuitar.bodyTypeId = Number(this.selectedGuitar.bodyTypeId);
    this.selectedGuitar.year = Number(this.selectedGuitar.year);
    this.selectedGuitar.price = Number(this.selectedGuitar.price);
    this.selectedGuitar.isSold = Number(this.selectedGuitar.isSold);

    if (this.isEditing) {
      this.guitarService.updateGuitar(this.selectedGuitar).subscribe({
        next: () => {
          this.loadGuitars();
          this.resetForm();
        },
        error: (err) => console.error('Failed to update guitar', err)
      });
    } else {
      this.guitarService.createGuitar(this.selectedGuitar).subscribe({
        next: () => {
          this.loadGuitars();
          this.resetForm();
        },
        error: (err) => console.error('Failed to create guitar', err)
      });
    }
  }

  editGuitar(guitar: Guitar): void {
    this.selectedGuitar = { ...guitar };
    this.isEditing = true;
  }

deleteGuitar(id: number | string | undefined): void {
  if (!id) return;

  if (confirm('Are you sure you want to delete this guitar listing?')) {
    this.guitarService.deleteGuitar(id).subscribe({
      next: () => {
        this.loadGuitars();
      },
      error: (err) => console.error('Failed to delete guitar', err)
    });
  }
}

  resetForm(): void {
    this.selectedGuitar = this.getEmptyGuitar();
    this.isEditing = false;
  }

  getBrandName(brandId: number): string {
    return this.brands.find((b) => b.brandId === Number(brandId))?.name || 'Unknown';
  }

  getBodyTypeName(bodyTypeId: number): string {
    return this.bodyTypes.find((bt) => bt.bodyTypeId === Number(bodyTypeId))?.name || 'Unknown';
  }

  private getEmptyGuitar(): Guitar {
    return {
      brandId: 1,
      bodyTypeId: 1,
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      size: 'Full',
      condition: 'Mint',
      isSold: 0,
      description: ''
    };
  }
}