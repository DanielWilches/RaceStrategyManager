import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientsModel } from '@Interfaces/ClientsModel.interface';
import { CreateStrategyRequest } from '@Interfaces/CreateStrategyRequest.interface';
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
  request:CreateStrategyRequest = {} as CreateStrategyRequest;
  constructor() { }

  ngOnInit() {
    this.Getpilots();
    // Inicializar cliente con un ID por defecto o obtenerlo de algún servicio
    // Por ahora, voy a crear un cliente temporal para evitar el error
    this.initializeClient();
  }

  initializeClient() {
    // Temporal: crear un cliente básico para evitar errores
    // En una aplicación real, esto vendría de un servicio de autenticación
    const tempClient: ClientsModel = {
      id: 1, // ID temporal
      // Agrega otras propiedades según tu interfaz ClientsModel
    } as ClientsModel;

    this.client.set(tempClient);
    console.log('Client initialized:', this.client());
  }


  Getpilots() {
    this.pilotService.getPilots().subscribe(
      (sub) => {
        sub.data.forEach((strategy: PilotsModel) => {
          this.pilots.update((current) => [...current, strategy]);
        });
        console.log('Strategies loaded:', this.pilots());
      });
    console.log('Loading strategies...');
  }

  onSearchTextChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchText.set(target.value);
  }

  onPilotChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPilotId.set(target.value);
    console.log('Pilot selected:', target.value);

    // Opcional: Si quieres obtener datos del cliente cuando se selecciona un piloto
    if (target.value) {
      // this.getClient(target.value); // Descomenta si necesitas obtener datos del cliente
    }
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

    // Enviar el POST con los valores capturados
    this.postStrategy(this.searchText(), parseInt(this.selectedPilotId()));
  }

  getClient(id: string) {
    this.ClientService.getClient(id).subscribe(
      (sub) => {
        sub.data.forEach((client: ClientsModel) => {
          this.client.set(client);
        });
        console.log('Client loaded:', this.pilots());
      });
    console.log('Loading client...');
  }

  postStrategy(value: string, id: number ){

    // Validar que tenemos un cliente válido
    if (!this.client() || !this.client().id) {
      console.error('No hay cliente disponible');
      alert('Error: No hay cliente disponible. Por favor, recarga la página.');
      return;
    }

    // Buscar el piloto seleccionado
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

    this.StrategyService.postStrategy(this.request).subscribe({
      next: (sub) => {
        console.log('Strategy posted successfully:', sub);
      },
      error: (error) => {
        console.error('Error posting strategy:', error);
        alert('Error al crear la estrategia');
      }
    });
    console.log('Posting strategy...');
  }
}
