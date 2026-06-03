import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { selectUser } from '../../services/selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};
