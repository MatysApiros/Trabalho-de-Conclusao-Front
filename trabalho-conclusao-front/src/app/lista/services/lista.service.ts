import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { Hospital } from '../models/hospitais.model';
import { Observable } from 'rxjs';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getEmergencias(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${URL}emergencias`)
      .pipe(
        map((response: any) => {
          response.emergencias.map((hospital: any) => delete hospital._id)
          return response.emergencias;
        }),
      );
  }

  public getUtis() {
    return this.http.get(`${URL}utis`)
    .pipe(
      map((response: any) => {
        response.utis.map((hospital: any) => delete hospital._id)
        return response.utis;
      })
    );
  }
}
