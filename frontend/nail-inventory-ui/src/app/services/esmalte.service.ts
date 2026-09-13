import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Esmalte } from '../models/esmalte';

@Injectable({
    providedIn: 'root'
})
export class EsmalteService {

    private readonly apiUrl = 'https://localhost:5236/api/Esmaltes';

    constructor(private http: HttpClient) { }

    getEsmaltes(): Observable<Esmalte[]> {
        return this.http.get<Esmalte[]>(this.apiUrl);
    }
}