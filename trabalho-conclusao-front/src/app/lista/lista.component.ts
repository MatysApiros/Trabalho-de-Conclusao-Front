import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Hospital } from './models/hospitais.model';
import { ListaService } from './services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nomeHospital', 'dataAtualizacao', 'percentualLotacao'];
  dataSource!: MatTableDataSource<Hospital>;
  panelOpenState = false;
  emergencias!: Hospital[];
  utis!: Hospital[];
  expandedElement!: Hospital;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly service: ListaService,
  ) {

    this.service.getEmergencias().subscribe((emergencias: Hospital[]) => {

      this.emergencias = emergencias;
      this.dataSource = new MatTableDataSource<Hospital>(emergencias);
      this.dataSource.paginator = this.paginator;
    });

    this.service.getUtis().subscribe((utis: Hospital[]) => {
      // console.log(utis);
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit() {

  }
}


