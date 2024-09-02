import { driveEngine, getCars, startEngine, stopEngine } from "../../api/api";
import { ResponseStatus } from "../../types/types";
// import { page } from "./edit-form-func";

export type DescCarForWinTable = {
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
};
const infoAnimation: { [id: number]: DescCarForWinTable } = {};
console.log(infoAnimation);

function startAnimation(car: HTMLElement, track: number, duration: number) {
  let startTime = 0;
  const idAnime = <DescCarForWinTable>{};

  function step(time: number) {
    if (!startTime) {
      startTime = time;
    }

    const progress: number = (time - startTime) / duration;
    const translate: number = progress * track;
    // car.style.right = `${translate}`;
    car.style.transform = `translateX(${translate}px) rotate(0)matrix(-1, 0, 0, 1, 0, 0)`;

    if (progress < 1) {
      idAnime.id = window.requestAnimationFrame(step);
    }
  }
  idAnime.id = window.requestAnimationFrame(step);
  console.log(idAnime);
  return idAnime;
}

export async function startCar(id: number): Promise<void> {
  const startBtn: HTMLButtonElement | null = document.querySelector(`.btn-car-start[data-id="${id}"]`);
  const stopBtn: HTMLButtonElement | null = document.querySelector(`.btn-car-stop[data-id="${id}"]`);
  if (startBtn) startBtn.setAttribute("disabled", "true");
  if (stopBtn) stopBtn.removeAttribute("disabled");

  startEngine(id).then((res) => {
    const velocity: number = Number(res.velocity);
    const distance: number = Number(res.distance);
    const time: number = distance / velocity; // time - ms

    const car = document.querySelector(`.car[data-id="${id}"] svg`) as HTMLElement;
    const track = document.querySelector(`.car[data-id="${id}"]`) as HTMLElement;
    const trackLength: number = track.clientWidth - car.clientWidth;

    console.log(infoAnimation);

    infoAnimation[id] = startAnimation(car, trackLength, time);

    console.log(infoAnimation);

    console.log(velocity, distance, time);

    driveEngine(id)
      .then((res) => {
        if (res.status !== ResponseStatus.internalServerError) {
          window.cancelAnimationFrame(infoAnimation[id].id);
        }
        console.log("car is going!!", res);
      })
      .catch((rej) => {
        if (rej === ResponseStatus.internalServerError) {
          window.cancelAnimationFrame(infoAnimation[id].id);
        }
      });
  });
}

export async function stopCar(id: number) {
  const startBtn: HTMLButtonElement | null = document.querySelector(`.btn-car-start[data-id="${id}"]`);
  const stopBtn: HTMLButtonElement | null = document.querySelector(`.btn-car-stop[data-id="${id}"]`);
  if (stopBtn) stopBtn.setAttribute("disabled", "true");

  stopEngine(id).then(() => {
    console.log("STOP");
    window.cancelAnimationFrame(infoAnimation[id].id);
    // window.cancelAnimationFrame(id);
    const car = document.querySelector(`.car[data-id="${id}"] svg`) as HTMLElement;
    car.style.transform = `translateX(0px) rotate(0)matrix(-1, 0, 0, 1, 0, 0)`;
    if (startBtn) startBtn.removeAttribute("disabled");
  });
}

export async function raceAll(page: number) {
  const raceBtn = document.querySelector(".race-btn");
  const resetBtn = document.querySelector(".reset-btn");
  if (resetBtn) resetBtn.removeAttribute("disabled");
  if (raceBtn) raceBtn.setAttribute("disabled", "true");

  const cars = await getCars(page);
  cars.carsList.forEach((car) => startCar(car.id));
}

export async function resetAll(page: number) {
  await getCars(page).then((cars) => {
    cars.carsList.forEach((car) => stopCar(car.id));
  });

  const raceBtn = document.querySelector(".race-btn");
  const resetBtn = document.querySelector(".reset-btn");
  if (raceBtn) raceBtn.removeAttribute("disabled");
  if (resetBtn) resetBtn.setAttribute("disabled", "true");
}
