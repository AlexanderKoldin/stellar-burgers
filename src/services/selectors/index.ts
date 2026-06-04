import { RootState } from '../store';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
export const selectIngredientById =
  (id: string | undefined) => (state: RootState) =>
    state.ingredients.ingredients.find((item) => item._id === id);

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserError = (state: RootState) => state.user.error;

export const selectFeedOrders = (state: RootState) => state.feeds.orders;
export const selectUserOrders = (state: RootState) => state.feeds.userOrders;
export const selectFeedLoading = (state: RootState) => state.feeds.isLoading;
export const selectFeedTotal = (state: RootState) => state.feeds.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.feeds.totalToday;

export const selectOrderById = (number: number) => (state: RootState) =>
  state.feeds.orders.find((item) => item.number === number) ||
  state.feeds.userOrders.find((item) => item.number === number) ||
  (state.order.orderData?.number === number ? state.order.orderData : null);

export const selectOrderData = (state: RootState) => state.order.orderData;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderInfo = (state: RootState) => state.order.orderInfo;
export const selectOrderInfoRequest = (state: RootState) =>
  state.order.orderInfoRequest;
