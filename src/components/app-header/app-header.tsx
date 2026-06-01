import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.user);

  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};
