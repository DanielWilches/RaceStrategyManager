import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@Environments/environment';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { TiresModel } from '@Interfaces/TiresModel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiresService {
  http = inject(HttpClient);
  _url: string = environment.baseURL;
  constructor() {
    this._url = `${this._url}/api/${environment.VersionApi}/${environment.Tires}`;
  }

  getStrategies(): Observable<ModelResult<TiresModel>> {
    return this.http.get<ModelResult<TiresModel>>(this._url);
  }

}
