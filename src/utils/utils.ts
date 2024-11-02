import { clsx, ClassValue } from "clsx";
import qs from "qs";
import { WeekDayEnum } from "../types/types";

export function cn(...classNames: ClassValue[]) {
  return clsx(classNames);
}

export function urlQueryBuilder(obj: any) {
  return qs.stringify(obj, { addQueryPrefix: true });
}

export function formatLink(
  link: string,
  params: Record<string, string>,
  query?: any
) {
  let newLink = link;
  Object.keys(params).forEach((key) => {
    newLink = newLink.replace(`:${key}`, params[key]);
  });
  return newLink + urlQueryBuilder(query);
}

export function getNotWorkingWeekdays(weekdays: string) {
  const weekdaysSplitted = weekdays.split("_") as (keyof typeof WeekDayEnum)[];
  const weekdaysNumber = weekdaysSplitted.map((day) => WeekDayEnum[day]);
  const allWeekDays = Object.values(WeekDayEnum) as WeekDayEnum[];
  return allWeekDays.filter((val) => !weekdaysNumber.includes(val));
}
