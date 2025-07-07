import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardStrategyComponent } from "../CardStrategy/CardStrategy.component";
import { StrategyService } from '@Services/Strategy.service';
import { StrategiesResponse } from '@Interfaces/StrategiesResponseModel.interface';
@Component({
  selector: 'app-list-card-strategy',
  imports: [CardStrategyComponent],
  templateUrl: './ListCardStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCardStrategyComponent implements OnInit {
  strategyServices = inject(StrategyService);
  //strategies: WritableSignal<StrategiesResponse[]> = signal<StrategiesResponse[]>([]);
  constructor() {
    //effect(() => {
    //  this.strategyServices.strategies();
    //});
  }
  ngOnInit() {
    this.loadStrategies();
  }

  loadStrategies() {
    this.strategyServices.getStrategies();
  }

}
