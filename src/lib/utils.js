import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getRotationDegrees = (prizeNumber, numberOfPrizes) => {
  const degreesPerPrize = 360 / numberOfPrizes;

  const prizeRotation = degreesPerPrize * (numberOfPrizes - prizeNumber);

  return numberOfPrizes - prizeNumber > numberOfPrizes / 2
    ? -360 + prizeRotation
    : prizeRotation;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export function deleteAttributeInSearchParams(searchParams, attributes) {
  // 2 params : searchParams: searchParams of nextjs, attributes: array
  // this function delete attribute already have

  let searchParamsUrl = "";
  Object.keys(searchParams).forEach(function (key, index) {
    if (attributes.includes(key)) return;
    searchParamsUrl += `${key}=${searchParams[key]}&`;
  });
  searchParamsUrl.endsWith("&") &&
    (searchParamsUrl = searchParamsUrl.slice(0, -1));
  return searchParamsUrl;
}

export function formatDateTimeToCustomString(date) {
  // Original datetime string
  let originalDatetimeStr = date;

  // Parse the original datetime string into a Date object
  let originalDate = new Date(originalDatetimeStr);

  const pad = (num, size) => {
    return ("000" + num).slice(-size);
  };

  let formattedDatetime =
    pad(originalDate.getDate(), 2) +
    "-" +
    pad(originalDate.getMonth() + 1, 2) +
    "-" +
    originalDate.getFullYear() +
    " " +
    pad(originalDate.getHours() % 12 || 12, 2) +
    ":" +
    pad(originalDate.getMinutes(), 2) +
    " " +
    (originalDate.getHours() >= 12 ? "PM" : "AM");
  return formattedDatetime;
}

export const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseCurrency = (value) => {
  return parseInt(value.replace(/,/g, ""), 10) || 0;
};
