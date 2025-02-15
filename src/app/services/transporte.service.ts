import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private apiUrl = 'http://localhost:3000/transporte'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  obtenerFiltrado(
    anioInicio?: number,
    anioFin?: number,
    mesInicio?: number,
    mesFin?: number,
    transporte?: string,
    variable?: string
  ): Observable<any> {
    const headers = this.getAuthHeaders();
    let url = `${this.apiUrl}/filtrar?`;
    if (anioInicio) url += `anioInicio=${anioInicio}&`;
    if (anioFin) url += `anioFin=${anioFin}&`;
    if (mesInicio) url += `mesInicio=${mesInicio}&`;
    if (mesFin) url += `mesFin=${mesFin}&`;
    if (transporte) url += `transporte=${transporte}&`;
    if (variable) url += `variable=${variable}&`;
    return this.http.get(url, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
