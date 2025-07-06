import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-strategy',
  imports: [],
  templateUrl: './CardStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStrategyComponent { }
