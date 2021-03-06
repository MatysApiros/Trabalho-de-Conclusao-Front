import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hospital } from './models/hospitais.model';
import { ListaService } from './services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class ListaComponent implements OnInit {

  displayedColumns: string[] = ['nomeHospital', 'dataAtualizacao', 'percentualLotacao'];
  dataSourceEmergencias!: MatTableDataSource<Hospital>;
  dataSourceUtis!: MatTableDataSource<Hospital>;
  panelOpenState = false;
  expandedElement!: Hospital;
  modoDaltonico = false;
  colorHigh = 'high';
  colorMedium = 'medium';
  colorLow = 'low';

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    private readonly service: ListaService,
  ) {

    this.service.getEmergencias().subscribe((emergencias: Hospital[]) => {

      const emergenciasData = this.compararNumeros(emergencias);

      this.dataSourceEmergencias = new MatTableDataSource<Hospital>(emergenciasData);
      this.dataSourceEmergencias.paginator = this.paginator.toArray()[0];
      this.dataSourceEmergencias.sort = this.sort.toArray()[0];
    });

    this.service.getUtis().subscribe((utis: Hospital[]) => {

      const utisData = this.compararNumeros(utis);

      this.dataSourceUtis = new MatTableDataSource<Hospital>(utisData);
      this.dataSourceUtis.paginator = this.paginator.toArray()[1];
      this.dataSourceUtis.sort = this.sort.toArray()[1];
    });
  }

  ngOnInit(): void { }

  public setElementoAberto(hospital: Hospital): void {
    if (this.expandedElement === hospital) {
      this.expandedElement = null!;
    } else {
      this.expandedElement = hospital;
    }
  }

  public getCorColunaPercentualLotacao(percentual: string): string {

    const percent = parseFloat(percentual);

    if (percent >= 75) {
      return this.colorHigh;
    }

    if (percent < 75 && percent >= 40) {
      return this.colorMedium;
    }

    if (isNaN(percent)) {
      return this.colorHigh;
    }

    return this.colorLow;
  }

  public compararNumeros(emergencias: Hospital[]) {
    var mapped = emergencias.map(function(el, i) {
      return { index: i, value: parseFloat(el.percentualLotacao) };
    })

    mapped.sort(function(a, b) {
      return +(a.value > b.value) || +(a.value === b.value) - 1;
    });

    return mapped.map(function(el){
      return emergencias[el.index];
    });
  }

  public setModoDaltonico(modoDaltonico: boolean) {

    if (modoDaltonico !== this.modoDaltonico) {
      this.modoDaltonico = modoDaltonico;
      this.colorHigh = 'daltonicoHigh';
      this.colorMedium = 'daltonicoMedium';
      this.colorLow = 'daltonicoLow';
    } else {
      this.modoDaltonico = false;
      this.colorHigh = 'high';
      this.colorMedium = 'medium';
      this.colorLow = 'low';
    }
  }
}
