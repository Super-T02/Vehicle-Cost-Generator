export interface VehicleInput {
  vin: string,
  name: string,
  year?: Date,
  make: string,
  model?: string,
  type?: string,
  color?: string,
  weight?: number,
  license?: string
}

export interface Vehicle {
  username: string,
  vin: string,
  name: string,
  year?: string,
  make: string,
  model?: string,
  type?: string,
  color?: string,
  weight?: number,
  license?: string
}
