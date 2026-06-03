import { BurgerIngredientUI } from '@ui';
import { TIngredient } from '@utils-types';
import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { addIngredient } from '../../services/constructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { ingredients, bun } = useSelector(
      (state) => state.burgerConstructor
    );

    const count = useMemo(() => {
      if (ingredient.type === 'bun') {
        return bun?._id === ingredient._id ? 1 : 0;
      }

      return ingredients.filter(
        (item: TIngredient) => item._id === ingredient._id
      ).length;
    }, [ingredients, bun, ingredient._id, ingredient.type]);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
