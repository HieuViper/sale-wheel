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

export function formatDateTimeToCustomString(isoDate) {
  const [datePart, timePart] = isoDate.split("T"); // Phân tách ngày và giờ
  const [year, month, day] = datePart.split("-"); // Tách phần ngày
  const [hour, minute] = timePart.split(":"); // Tách phần giờ phút

  // Chuyển đổi giờ từ 24h sang 12h với AM/PM
  const hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? "PM" : "AM";
  const formattedHour = hourInt % 12 || 12; // Chuyển đổi giờ về 12h (12 giờ sáng là 12, không phải 0)

  // Ghép lại theo định dạng mong muốn
  return `${day}-${month}-${year} ${String(formattedHour).padStart(
    2,
    "0"
  )}:${minute} ${period}`;
}

export const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseCurrency = (value) => {
  return parseInt(value.replace(/,/g, ""), 10) || 0;
};
