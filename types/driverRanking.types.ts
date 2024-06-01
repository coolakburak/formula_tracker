export interface Root {
  get: string;
  parameters: Parameters;
  errors: any[];
  results: number;
  response: DriverRanking[];
}

export interface Parameters {
  season: string;
}

export interface DriverRanking {
  position: number;
  driver: Driver;
  team: Team;
  points?: number;
  wins: number;
  behind: number;
  season: number;
}

export interface Driver {
  id: number;
  name: string;
  abbr: string;
  number: number;
  image: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}
