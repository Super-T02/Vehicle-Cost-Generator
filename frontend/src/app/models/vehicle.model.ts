export interface Vehicle {
  vin: string,
  name: string,
  year?: number,
  make: string,
  model?: string,
  type?: string,
  color?: string,
  weight?: number,
  dimensions?: Dimension,
  license?: string
}

export interface Dimension {
  height: number,
  width: number,
  length: number
}
