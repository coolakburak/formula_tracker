export interface CircuitRoot {
    get: string
    parameters: any[]
    errors: any[]
    results: number
    response: Circuit[]
  }
  
  export interface Circuit {
    id: number
    name: string
    image: string
    competition: Competition
    first_grand_prix?: number
    laps?: number
    length: string
    race_distance?: string
    lap_record: LapRecord
    capacity?: number
    opened?: number
    owner?: string
  }
  
  export interface Competition {
    id?: number
    name?: string
    location: Location
  }
  
  export interface Location {
    country?: string
    city?: string
  }
  
  export interface LapRecord {
    time?: string
    driver?: string
    year?: string
  }
  