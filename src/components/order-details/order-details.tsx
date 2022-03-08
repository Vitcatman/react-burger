import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderContext } from "../../services/order-context";
import { useContext } from "react";

const OrderDetails = () => {
  const orderNumber = useContext(OrderContext);

  return (
    <>
      <div className={`mt-20 text text_type_digits-large`}>{orderNumber}</div>
      <p className={`text text_type_main-medium mt-8 mb-15`}>
        идентификатор заказа
      </p>
      <CheckMarkIcon type="primary" />
      <p className={`text text_type_main-default mt-15`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`mt-2 mb-15 text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на&nbsp;орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
