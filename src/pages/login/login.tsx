import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorText = useSelector((state) => state.user.error) || '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
