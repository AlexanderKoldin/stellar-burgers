import userReducer, {
  authChecked,
  loginUser,
  logoutUser
} from '../../userSlice';

describe('userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    user: null,
    error: null
  };

  test('должен вернуть начальное состояние при неизвестном экшене', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  test('должен устанавливать isAuthChecked в true при authChecked', () => {
    const state = userReducer(initialState, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать loginUser.pending', () => {
    const state = userReducer(
      { ...initialState, error: 'error' },
      { type: loginUser.pending.type }
    );
    expect(state.error).toBeNull();
  });

  test('должен обрабатывать loginUser.fulfilled', () => {
    const mockUser = { email: 'test@test.com', name: 'Test' };
    const state = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('должен обрабатывать loginUser.rejected', () => {
    const error = 'Login failed';
    const state = userReducer(initialState, {
      type: loginUser.rejected.type,
      error: { message: error }
    });
    expect(state.error).toBe(error);
  });

  test('должен обрабатывать logoutUser.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: { email: 'test@test.com', name: 'Test' }
    };
    const state = userReducer(stateWithUser, {
      type: logoutUser.fulfilled.type
    });
    expect(state.user).toBeNull();
  });
});
