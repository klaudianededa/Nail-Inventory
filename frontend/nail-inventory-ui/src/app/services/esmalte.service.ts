import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Esmalte } from '../models/esmalte';

@Injectable({
    providedIn: 'root'
})
export class EsmalteService {

    private readonly apiUrl = 'https://localhost:5236/api/Esmaltes';

    constructor(private http: HttpClient) { }

    getEsmaltes(
        marca?: string,
        vencimentoAte?: string
    ): Observable<Esmalte[]> {
        let params = new HttpParams();

        if (marca) {
            params = params.set('marca', marca);
        }

        if (vencimentoAte) {
            params = params.set('vencimentoAte', vencimentoAte);
        }

        return this.http.get<Esmalte[]>(this.apiUrl, { params });
    }
}