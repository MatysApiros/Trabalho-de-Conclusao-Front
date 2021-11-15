import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from "@angular/material/expansion"
import { ListaRoutingModule } from './routes/lista-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ListaRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
  ]
})
export class ListaModule { }
