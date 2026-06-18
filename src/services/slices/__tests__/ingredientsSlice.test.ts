import { TIngredient } from '../../../utils/types';
import ingredientsReducer, { fetchIngredients } from '../../ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  test('должен вернуть начальное состояние при вызове с неизвестным экшеном', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual(
      initialState
    );
  });

  test('должен установить loading: true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('должен обновить список ингредиентов при fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        price: 100,
        image: 'image_url',
        image_mobile: 'image_url',
        image_large: 'image_url'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientsReducer(initialState, action);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.loading).toBe(false);
  });
});
