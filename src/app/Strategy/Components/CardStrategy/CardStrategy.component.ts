import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StrategiesModel } from '@Interfaces/StrategiesModel.interface';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card-strategy',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './CardStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStrategyComponent {
  strategy = input.required<StrategiesModel>();
  isSelected = input<boolean>(false);
  customClass = input<string>('');
  title = input<string, string>('', {
    transform: (value: string) => value.toUpperCase()
  });
}
