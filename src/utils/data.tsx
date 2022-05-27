import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (date: string) => {
  const dateRelative = formatRelative(new Date(date), new Date(), {
    locale: ru,
  });
  if (date) return dateRelative.split(" в ").join(", ") + " i-GMT+3";
};

export const baseUrl = "https://norma.nomoreparties.space/api";
export const wsUrl = "wss://norma.nomoreparties.space/orders";
