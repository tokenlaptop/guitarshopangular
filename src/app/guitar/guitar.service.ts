import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guitar } from './guitar.model';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private apiUrl = 'http://localhost:3000/guitars'; 

  constructor(private http: HttpClient) {}

  getGuitars(): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(this.apiUrl);
  }

  createGuitar(guitar: Guitar): Observable<Guitar> {
    return this.http.post<Guitar>(this.apiUrl, guitar);
  }

  updateGuitar(guitar: Guitar): Observable<Guitar> {
    return this.http.put<Guitar>(`${this.apiUrl}/${guitar.id}`, guitar);
  }

  deleteGuitar(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}