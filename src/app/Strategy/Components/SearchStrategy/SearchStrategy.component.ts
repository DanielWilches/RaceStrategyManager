import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientsModel } from '@Interfaces/ClientsModel.interface';
import { CreateStrategyRequest } from '@Interfaces/CreateStrategyRequest.interface';
import { ModelResult } from '@Interfaces/ModelResult.interface';
import { PilotsModel } from '@Interfaces/PilotsModel.interface';
import { ClientService } from '@Services/Client.service';
import { PilotsService } from '@Services/Pilots.service';
import { StrategyService } from '@Services/Strategy.service';

@Component({
  selector: 'app-search-strategy',
  imports: [],
  templateUrl: './SearchStrategy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchStrategyComponent implements OnInit {

  pilotService = inject(PilotsService);
  ClientService = inject(ClientService);
  StrategyService = inject(StrategyService);
  pilots: WritableSignal<PilotsModel[]> = signal<PilotsModel[]>([]);
  client: WritableSignal<ClientsModel> = signal<ClientsModel>({} as ClientsModel);
  searchText: WritableSignal<string> = signal<string>('');
  selectedPilotId: WritableSignal<string> = signal<string>('');
  request: CreateStrategyRequest = {} as CreateStrategyRequest;
  constructor() { }

  ngOnInit() {
    this.Getpilots();
    this.getClient('1');
  }

  Getpilots() {
    this.pilotService.getPilots().subscribe(
      (sub) => {
        sub.data.forEach((strategy: PilotsModel) => {
          this.pilots.update((current) => [...current, strategy]);
        });
      });
  }

  getClient(id: string) {
    this.ClientService.getClient(id).subscribe(
      (sub) => {
        sub.data.forEach((client: ClientsModel) => {
          this.client.set(client);
        });
      });
    console.log('Loading client...');
  }

  postStrategy() {
    this.StrategyService.postStrategy(this.request).subscribe({
      next: (sub:ModelResult<null>) => {
        console.log('Strategy posted successfully:', sub);
        this.searchText.set('');
        this.selectedPilotId.set('');
        if (sub.statusCode !== 200) {
          alert('Error al crear la estrategia');
        }
        else { alert('Estrategia creada exitosamente'); }

        this.StrategyService.getStrategies();
      },
      error: (error) => {
        console.error('Error posting strategy:', error);
        alert('Error al crear la estrategia');
      }
    });
  }

  onSearchTextChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Search text changed:', target.value);
    this.searchText.set(target.value);
  }

  /// declaración del evento para el cambio de piloto
  /// se usa para capturar el cambio de selección en el dropdown de pilotos
  onPilotChange(event: Event) {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedPilotId.set(target.value);
    console.log('Pilot selected:', target.value);
  }

  onSearch() {
    console.log('Search text:', this.searchText());
    console.log('Selected pilot ID:', this.selectedPilotId());

    // Validar que ambos campos tengan valores
    if (!this.selectedPilotId()) {
      console.error('Por favor selecciona un piloto');
      alert('Por favor selecciona un piloto');
      return;
    }

    if (!this.searchText()) {
      console.error('Por favor ingresa un texto de búsqueda');
      alert('Por favor ingresa un texto de búsqueda');
      return;
    }


    this.CreatePostStrategy(this.searchText(), parseInt(this.selectedPilotId()));
  }



  CreatePostStrategy(value: string, id: number) {
    // Validar que tenemos un cliente válido
    if (!this.client() || !this.client().id) {
      console.error('No hay cliente disponible');
      alert('Error: No hay cliente disponible. Por favor, recarga la página.');
      return;
    }

    const selectedPilot = this.pilots().find(pilot => pilot.id === id);
    if (!selectedPilot) {
      console.error('Piloto no encontrado');
      alert('Error: Piloto no encontrado');
      return;
    }

    console.log('Client:', this.client().id.toString());
    console.log('Pilot ID:', selectedPilot.id.toString());

    this.request = {
      clientId: this.client().id.toString(),
      pilotId: selectedPilot.id.toString(),
      maxLaps: value
    };
    this.postStrategy();

    console.log('Posting strategy...');
  }


}
