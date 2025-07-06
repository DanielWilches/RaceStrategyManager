import { PilotsModel } from "./PilotsModel.interface";

export interface StrategiesModel {
  id: number;
  pilotId: number | PilotsModel;
  clientId: number | string;
  date: Date;
  totalLaps: number;
  optimalStrategy: string;
  avgPerformance: number;
  avgConsumption: number;
  maxLaps: number;
}
