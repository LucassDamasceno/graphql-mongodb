import React from 'react';
import { useAuth } from '../../hooks/auth';
import Bar from './bar';
import List from './list';

export const HomePageRouter = "/home"

const HomePage: React.FC = () => {
  useAuth()

  return (
    <>
      <Bar />
      <List />
    </>
  )
}

export default HomePage;