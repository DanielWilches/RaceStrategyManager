import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@Environments/environment';
import { ClientsModel } from '@Interfaces/ClientsModel.interface';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http = inject(HttpClient);
  _url: string = environment.baseURL;
  constructor() {
    this._url = `${this._url}/api/${environment.VersionApi}/${environment.Strategy}/${environment.Clients}`;
  }

  getClient(id: string): Observable<ModelResult<ClientsModel>> {
    return this.http.get<ModelResult<ClientsModel>>(`${this._url}/${id}`);
  }
}
