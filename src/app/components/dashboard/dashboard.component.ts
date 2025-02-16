import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TransporteService } from '../../services/transporte.service';
import { FiltrarResponseDto } from '../../dto/filtrar.dto';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  // Opciones para los filtros
  anioOptions: number[] = [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  mesOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // Ejemplo de transportes, ajusta o expánde según sea necesario
  transporteOptions: string[] = [
    'Tren Eléctrico',
    'Macrobús Servicio Alimentador',
    'Mi Transporte Eléctrico',
    'MI Macro Periférico Alimentador',
    'Trolebús',
    'Sistema Integral del Tren Ligero',
    'Mi Macro Periférico Alimentador',
    'Mi Macro Periférico Troncal',
    'Macrobús Servicio Troncal'
  ];

  // Filtros (valores seleccionados)
  anioInicio: number = this.anioOptions[0];
  anioFin: number = this.anioOptions[this.anioOptions.length - 1];
  mesInicio: number = this.mesOptions[0];
  mesFin: number = this.mesOptions[this.mesOptions.length - 1];
  // Para transporte, se puede seleccionar uno o más valores. Por simplicidad, usaremos un array.
  transporte: string[] = [];

  // Estadísticas obtenidas
  stats: FiltrarResponseDto = {
    ingresosPorPasaje: 0,
    kilometrosRecorridos: 0,
    longitudServicio: 0,
    pasajerosTransportados: 0,
    unidadesEnOperacion: 0
  };

  constructor(private authService: AuthService, private transporteService: TransporteService, private router: Router) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    // Llamada al servicio, pasando el array de transportes seleccionado
    this.transporteService.obtenerFiltrado(
      this.anioInicio,
      this.anioFin,
      this.mesInicio,
      this.mesFin,
      this.transporte,
    ).subscribe((response: FiltrarResponseDto) => {
      this.stats = response;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
