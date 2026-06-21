import orderReducer, { clearOrderData, createOrder } from '../../orderSlice';

describe('orderSlice', () => {
  const initialState = {
    orderData: null,
    orderRequest: false,
    orderInfo: null,
    orderInfoRequest: false,
    error: null
  };

  test('должен вернуть начальное состояние', () => {
    expect(orderReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('должен обрабатывать createOrder.pending', () => {
    const state = orderReducer(initialState, {
      type: createOrder.pending.type
    });
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('должен обрабатывать clearOrderData', () => {
    const stateWithData = { ...initialState, orderData: { _id: '123' } as any };
    const state = orderReducer(stateWithData, clearOrderData());
    expect(state.orderData).toBeNull();
  });
});
