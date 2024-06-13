export interface DetailRoot {
  get: string;
  parameters: Parameters;
  errors: any[];
  results: number;
  response: DriverDetail[];
}

export interface Parameters {
  search: string;
}

export interface DriverDetail {
  id: number;
  name: string;
  abbr: string;
  image: string;
  nationality: string;
  country: Country;
  birthdate: string;
  birthplace: string;
  number: number;
  grands_prix_entered: number;
  world_championships: number; //
  podiums: number; //
  highest_race_finish: HighestRaceFinish; 
  highest_grid_position: number;
  career_points: string; //
  teams: Team[];
}

export interface Country {
  name: string;
  code: string;
}

export interface HighestRaceFinish {
  position: number;
  number: number;
}

export interface Team {
  season: number;
  team: Team2;
}

export interface Team2 {
  id: number;
  name: string;
  logo: string;
}
