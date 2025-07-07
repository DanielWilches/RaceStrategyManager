import { ChangeDetectionStrategy, Component, effect, input, OnInit, signal, WritableSignal } from '@angular/core';
import { StrategiesResponse } from '@Interfaces/StrategiesResponseModel.interface';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PilotsModel } from '@Interfaces/PilotsModel.interface';

@Component({
  selector: 'app-card-strategy',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './CardStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStrategyComponent implements OnInit {
  strategy = input.required<StrategiesResponse>();
  pilot: WritableSignal<PilotsModel> = signal<PilotsModel>({} as PilotsModel);
  isSelected = input<boolean>(false);
  customClass = input<string>('');
  title = input<string, string>('', {
    transform: (value: string) => value.toUpperCase()
  });

  ngOnInit() {
    // Initialization logic if needed
  }
  constructor() {

  }

}
