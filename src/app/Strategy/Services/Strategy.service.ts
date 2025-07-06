import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@Environments/environment';
import { CreateStrategyRequest } from '@Interfaces/CreateStrategyRequest.interface';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { StrategiesModel } from '@Interfaces/StrategiesModel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  http = inject(HttpClient);
  _url: string = environment.baseURL;

  constructor() {
    this._url = `${this._url}/api/${environment.VersionApi}/${environment.Strategy}`;
  }

  getStrategies(): Observable<ModelResult<StrategiesModel>> {
    return this.http.get<ModelResult<StrategiesModel>>(this._url);
  }

  postStrategy(strategy: CreateStrategyRequest): Observable<ModelResult<StrategiesModel>> {
    console.log('Posting strategy:', strategy);
    return this.http.post<ModelResult<StrategiesModel>>(this._url, strategy);
  }
}
