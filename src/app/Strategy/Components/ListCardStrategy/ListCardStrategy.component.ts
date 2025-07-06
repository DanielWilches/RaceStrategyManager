import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardStrategyComponent } from "../CardStrategy/CardStrategy.component";
import { StrategyService } from '@Services/Strategy.service';
import { StrategiesModel } from '@Interfaces/StrategiesModel.interface';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { PilotsService } from '@Services/Pilots.service';
import { PilotsModel } from '@Interfaces/PilotsModel.interface';

@Component({
  selector: 'app-list-card-strategy',
  imports: [CardStrategyComponent],
  templateUrl: './ListCardStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCardStrategyComponent implements OnInit {
  strategyServices = inject(StrategyService);
  PilotsServices = inject(PilotsService);

  strategies: WritableSignal<StrategiesModel[]> = signal<StrategiesModel[]>([]);
  Pilot: WritableSignal<PilotsModel[]> = signal<PilotsModel[]>([]);

  constructor() { }

  ngOnInit() {
    this.loadStrategies();
    this.setPilotById();
     // Example ID, replace with actual logic to get the pilot ID
  }

  loadStrategies() {
    this.strategyServices.getStrategies().subscribe(
      (sub) => {
        sub.data.forEach((strategy: StrategiesModel) => {
          this.strategies.update((current) => [...current, strategy]);
        });
        console.log('Strategies loaded:', this.strategies());
      });
    console.log('Loading strategies...');
  }


  getPilot(id: string ) {
    this.PilotsServices.getPilot(id).subscribe(
      (sub) => {
        sub.data.forEach((pilot: PilotsModel) => {
          this.Pilot.update((current) => [...current, pilot]);
        });
        console.log('Strategies loaded:', this.strategies());
      });
    console.log('Loading strategies...');
  }

  setPilotById()
  {
    for (const strategy of this.strategies()) {
      this.getPilot(strategy.pilotId.toString());
    }
    for (const pilot of this.Pilot()) {

      console.log('Pilot updated:', pilot);
    }
  }



}
