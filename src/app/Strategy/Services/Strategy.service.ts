import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '@Environments/environment';
import { CreateStrategyRequest } from '@Interfaces/CreateStrategyRequest.interface';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { StrategiesResponse } from '@Interfaces/StrategiesResponseModel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  http = inject(HttpClient);
  _url: string = environment.baseURL;
  strategies: WritableSignal<StrategiesResponse[]> = signal<StrategiesResponse[]>([]);

  constructor() {
    this._url = `${this._url}/api/${environment.VersionApi}/${environment.Strategy}`;
    console.log('Strategy Service URL:', this._url);
  }

  getStrategies(): void {
    this.strategies.set([]);
    this.http.get<ModelResult<StrategiesResponse>>(`${this._url}`).subscribe(
      (sub) => {
        sub.data.forEach((strategy: StrategiesResponse) => {
          this.strategies.update((current) => [...current, strategy]);
        });
        console.log('Loading strategies...');
      });;
  }

  postStrategy(strategy: CreateStrategyRequest): Observable<ModelResult<null>> {
    console.log('Posting strategy:', `${JSON.stringify(strategy)}`);

    let params = new HttpParams()
      .set('maxLaps', strategy.maxLaps.toString())
      .set('ClientId', strategy.clientId)
      .set('PilotId', strategy.pilotId);

    return this.http.post<ModelResult<null>>(`${this._url}/optimal`, strategy, { params });
  }
}
