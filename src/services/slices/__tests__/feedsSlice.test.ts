import feedsReducer, { fetchFeeds } from '../../feedsSlice';

describe('feedsSlice', () => {
  const initialState = {
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  test('должен вернуть начальное состояние', () => {
    expect(feedsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('должен обрабатывать fetchFeeds.pending', () => {
    const state = feedsReducer(initialState, { type: fetchFeeds.pending.type });
    expect(state.isLoading).toBe(true);
  });
});
