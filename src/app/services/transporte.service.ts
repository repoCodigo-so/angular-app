// src/app/services/transporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltrarResponseDto } from '../dto/filtrar.dto';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private apiUrl = 'http://54.196.145.63/api/transporte'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  obtenerFiltrado(
    anioInicio?: number,
    anioFin?: number,
    mesInicio?: number,
    mesFin?: number,
    transporte?: string[],
  ): Observable<FiltrarResponseDto> {
    const headers = this.getAuthHeaders();
    let url = `${this.apiUrl}/filtrar?`;

    if (anioInicio) {
      url += `anioInicio=${anioInicio}&`;
    }
    if (anioFin) {
      url += `anioFin=${anioFin}&`;
    }
    if (mesInicio) {
      url += `mesInicio=${mesInicio}&`;
    }
    if (mesFin) {
      url += `mesFin=${mesFin}&`;
    }
    if (transporte && transporte.length > 0) {
      // Enviamos el array convertido a una cadena separada por comas
      url += `transporte=${transporte.join(',')}&`;
    }

    return this.http.get<FiltrarResponseDto>(url, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
