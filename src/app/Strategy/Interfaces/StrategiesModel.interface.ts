export interface StrategiesModel {
  id: number;
  pilotId: number;
  clientId: number;
  date: Date;
  totalLaps: number;
  optimalStrategy: string;
  avgPerformance: number;
  avgConsumption: number;
  maxLaps: number;
}
