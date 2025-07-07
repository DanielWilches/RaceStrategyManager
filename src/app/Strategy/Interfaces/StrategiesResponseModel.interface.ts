import { ClientsModel } from "./ClientsModel.interface";
import { PilotsModel } from "./PilotsModel.interface";

export interface StrategiesResponse {
  id: number;
  pilots:PilotsModel;
  clients: ClientsModel;
  date: Date;
  totalLaps: number;
  optimalStrategy: string;
  avgPerformance: number;
  avgConsumption: number;
  maxLaps: number;
}
