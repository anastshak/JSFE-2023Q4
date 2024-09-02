export enum Endpoints {
  garage = "garage",
  winners = "winners",
  engine = "engine",
}

export enum ResponseStatus {
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500,
}

export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Cars {
  carsList: Car[];
  totalCount: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface Winners {
  winnersList: Winner[];
  totalCount: number;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}
