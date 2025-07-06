import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@Environments/environment';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { PilotsModel } from '@Interfaces/PilotsModel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PilotsService {
  http = inject(HttpClient);
  _url: string = environment.baseURL;

  constructor() {
    this._url = `${this._url}/api/${environment.VersionApi}/${environment.Strategy}/${environment.Pilots}`;
  }

  getPilots(): Observable<ModelResult<PilotsModel>> {
    return this.http.get<ModelResult<PilotsModel>>(this._url);
  }

  getPilot(id: string): Observable<ModelResult<PilotsModel>> {
    return this.http.post<ModelResult<PilotsModel>>(this._url, id);
  }
}
