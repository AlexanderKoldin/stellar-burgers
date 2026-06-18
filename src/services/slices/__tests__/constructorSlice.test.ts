import { TIngredient } from '@utils-types';
import constructorReducer, {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient
} from '../../constructorSlice';

describe('constructorSlice', () => {
  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'url',
    image_mobile: 'url',
    image_large: 'url'
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  test('должен вернуть начальное состояние при неизвестном экшене', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN' })).toEqual(
      initialState
    );
  });

  test('должен добавлять булку', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.bun).toEqual(expect.objectContaining({ _id: '1' }));
  });

  test('должен добавлять ингредиент (не булку)', () => {
    const filling = { ...mockIngredient, type: 'main' };
    const action = addIngredient(filling);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('1');
  });

  test('должен удалять ингредиент', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: 'test-id' }]
    };
    const action = removeIngredient('test-id');
    const state = constructorReducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  test('должен очищать конструктор', () => {
    const stateWithData = {
      bun: mockIngredient,
      ingredients: [{ ...mockIngredient, id: 'test-id' }]
    };
    const action = clearConstructor();
    const state = constructorReducer(stateWithData, action);
    expect(state).toEqual(initialState);
  });

  test('должен перемещать ингредиент', () => {
    const stateWithTwo = {
      bun: null,
      ingredients: [
        { id: '1', name: 'Ингредиент 1', type: 'main' },
        { id: '2', name: 'Ингредиент 2', type: 'main' }
      ] as any
    };

    const action = moveIngredient({ from: 0, to: 1 });
    const state = constructorReducer(stateWithTwo, action);

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });
});
