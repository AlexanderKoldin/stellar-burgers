import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { clearOrderInfo, getOrderByNumber } from '../../services/orderSlice';
import {
  selectIngredients,
  selectOrderInfo,
  selectOrderInfoRequest
} from '../../services/selectors';
import { useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const orderNumber = Number(number);

  const ingredients = useSelector(selectIngredients);
  const orderData = useSelector(selectOrderInfo);
  const isRequest = useSelector(selectOrderInfoRequest);

  useEffect(() => {
    if (orderData?.number === orderNumber) {
      return;
    }

    if (isRequest) {
      return;
    }

    dispatch(getOrderByNumber(orderNumber));

    return () => {
      dispatch(clearOrderInfo());
    };
  }, [dispatch, orderNumber, orderData?.number, isRequest]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: Record<string, TIngredient & { count: number }>, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
