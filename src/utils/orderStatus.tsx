export const checkOrderStatus = (status: string) => {
  switch (status) {
    case "done":
      return "Выполнен";
    case "pending":
      return "Готовится";
    case "created":
      return "Создан";
  }
};
