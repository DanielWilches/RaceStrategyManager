import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardStrategyComponent } from "../CardStrategy/CardStrategy.component";
import { StrategyService } from '@Services/Strategy.service';
import { StrategiesModel } from '@Interfaces/StrategiesModel.interface';
import { ModelResult } from '@Interfaces/ModelResult.interface';

@Component({
  selector: 'app-list-card-strategy',
  imports: [CardStrategyComponent],
  templateUrl: './ListCardStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCardStrategyComponent implements OnInit {
  strategyServices = inject(StrategyService);
  strategies: WritableSignal<StrategiesModel[]> = signal<StrategiesModel[]>([]);

  constructor() {}

  ngOnInit() {
    this.loadStrategies();
  }

  loadStrategies() {
    this.strategyServices.getStrategies().subscribe(
      (sub)=>{

      sub.data.forEach((strategy: StrategiesModel) => {
        this.strategies.update((current) => [...current, strategy]);
      });
      console.log('Strategies loaded:', this.strategies());
    });
    console.log('Loading strategies...');
  }

}
