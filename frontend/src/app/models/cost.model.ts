export interface SingleCostItemInput {
  km?: number,
  price: number,
  date: Date,
  type: string,
  name: string,
  description?: string
}

export interface SingleCostItem {
  id: string,
  vin: string,
  username: string,
  km?: number,
  price: number,
  date: Date,
  type: string,
  name: string,
  description?: string
}

export interface FuelCostItemInput {
  km?: number,
  price: number,
  date: Date,
  volume: number,
  consumption?: number,
  type?: string
}

export interface FuelCostItem {
  id: string,
  vin: string,
  username: string,
  km?: number,
  price: number,
  date: Date,
  volume: number,
  consumption?: number,
  type?: string
}

export interface RepeatingCostItemInput {
  price: number,
  date: Date,
  period: string,
  name: string,
  description?: string
}

export interface RepeatingCostItem {
  id: string,
  vin: string,
  username: string,
  price: number,
  date: Date,
  period: string,
  name: string,
  description?: string
}

export interface CostPerMonth {
  date: Date,
  costs: number
}
