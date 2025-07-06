import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchStrategyComponent } from "../../Components/SearchStrategy/SearchStrategy.component";
import { ListCardStrategyComponent } from "../../Components/ListCardStrategy/ListCardStrategy.component";

@Component({
  selector: 'app-strategy-page',
  imports: [SearchStrategyComponent, ListCardStrategyComponent],
  templateUrl: './StrategyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyPageComponent { }
