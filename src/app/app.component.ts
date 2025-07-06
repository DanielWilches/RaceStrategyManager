import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StrategyPageComponent } from "./Strategy/Pages/StrategyPage/StrategyPage.component";

@Component({
  selector: 'app-root',
  imports: [StrategyPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RaceStrategyManager';
}
