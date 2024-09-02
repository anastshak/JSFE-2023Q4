import { Endpoints, Car, Cars, ResponseStatus, EngineResponse, Winners, Winner } from "../types/types";

const baseURL = "http://127.0.0.1:3000";

/* cars */

export async function getCars(page: number, limit: number = 7): Promise<Cars> {
  const url = `${baseURL}/${Endpoints.garage}?_page=${page}&_limit=${limit}`;
  const response = await fetch(url, { method: "GET" });
  const result: Array<Car> = await response.json();

  return {
    carsList: result,
    totalCount: Number(response.headers.get("X-Total-Count")),
  };
}

export async function getAllCars(): Promise<Car[]> {
  const url = `${baseURL}/${Endpoints.garage}`;
  const response = await fetch(url, { method: "GET" });
  const allCars: Array<Car> = await response.json();

  return allCars;
}

export async function getCar(id: number): Promise<Car> {
  const url = `${baseURL}/${Endpoints.garage}/${id}`;
  const response = await fetch(url, { method: "GET" });
  const car: Car = await response.json();

  return car;
}

export async function createCar(name: string, color: string): Promise<Car> {
  const url = `${baseURL}/${Endpoints.garage}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  };
  const response = await fetch(url, options);
  const createdCar: Car = await response.json();

  return createdCar;
}

export async function deleteCar(id: number): Promise<ResponseStatus> {
  const url = `${baseURL}/${Endpoints.garage}/${id}`;
  const result = await fetch(url, { method: "DELETE" });

  return result.status;
}

export async function updateCar(id: number, name: string, color: string): Promise<ResponseStatus> {
  const url = `${baseURL}/${Endpoints.garage}/${id}`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  };
  const result = await fetch(url, options);

  return result.status;
}

/* engine */

export async function startEngine(id: number): Promise<EngineResponse> {
  const url = `${baseURL}/${Endpoints.engine}?id=${id}&status=started`;
  const response = await fetch(url, { method: "PATCH" });
  const engineResponse = (await response.json()) as EngineResponse;

  return engineResponse;
}

export async function stopEngine(id: number): Promise<EngineResponse> {
  const url = `${baseURL}/${Endpoints.engine}?id=${id}&status=stopped`;
  const response = await fetch(url, { method: "PATCH" });
  const engineResponse = (await response.json()) as EngineResponse;

  return engineResponse;
}

export async function driveEngine(id: number): Promise<Response> {
  const url = `${baseURL}/${Endpoints.engine}?id=${id}&status=drive`;
  const response = await fetch(url, { method: "PATCH" });

  return response;
}

/* winners */

export async function getWinners(): Promise<Winners> {
  const url = `${baseURL}/${Endpoints.winners}`;
  const response = await fetch(url, { method: "GET" });
  const winners: Winner[] = await response.json();

  return {
    winnersList: winners,
    totalCount: Number(response.headers.get("X-Total-Count")),
  };
}

export async function getAllWinners(): Promise<Winner[]> {
  const url = `${baseURL}/${Endpoints.winners}/`;
  const response = await fetch(url, { method: "GET" });
  const winners: Winner[] = await response.json();

  return winners;
}

export async function getWinner(id: number): Promise<Winner> {
  const url = `${baseURL}/${Endpoints.winners}/${id}`;
  const response = await fetch(url, { method: "GET" });
  const winner = (await response.json()) as Winner;

  return winner;
}

export async function createWinner(id: number, wins: number, time: number): Promise<Response> {
  const url = `${baseURL}/${Endpoints.winners}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, wins, time }),
  };
  const response = await fetch(url, options);

  return response;
}

export async function deleteWinner(id: number): Promise<ResponseStatus> {
  const url = `${baseURL}/${Endpoints.winners}/${id}`;
  const response = await fetch(url, { method: "DELETE" });

  return response.status;
}

export async function updateWinner(id: number, wins: number, time: number): Promise<Response> {
  const url = `${baseURL}/${Endpoints.winners}/${id}`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      wins,
      time,
    }),
  };
  const response = await fetch(url, options);

  return response;
}
