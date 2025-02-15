import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TransporteService } from '../../services/transporte.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Filtros
  anioInicio: number = 0;
  anioFin: number = 0;
  mesInicio: number = 0;
  mesFin: number = 0;
  transporte: string = '';
  variable: string = ''; // Ej. "Ingresos por pasaje", "Pasajeros transportados", etc.

  datos: any[] = [];

  // Datos para la gráfica lineal
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Periodo';
  showYAxisLabel = true;
  yAxisLabel = 'Valor';

  constructor(private transporteService: TransporteService) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.transporteService.obtenerFiltrado(
      this.anioInicio,
      this.anioFin,
      this.mesInicio,
      this.mesFin,
      this.transporte,
      this.variable
    ).subscribe(response => {
      this.datos = response;
      this.generarChartData();
    });
  }

  generarChartData(): void {
    // Agrupar datos por período (Año-Mes) y sumar el "valor"
    const agrupado: { [key: string]: number } = {};
    this.datos.forEach(item => {
      const periodo = `${item.anio}-${String(item.id_mes).padStart(2, '0')}`;
      agrupado[periodo] = (agrupado[periodo] || 0) + item.valor;
    });
    this.chartData = Object.keys(agrupado).map(periodo => ({
      name: periodo,
      value: agrupado[periodo]
    }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }
}
