import words from '../../models/verbs';
import IndexScreen from './index';
import React from 'react';

const Verbs = ({route}) => (
  <IndexScreen key={route.params.source} words={words} />
);
export default Verbs;
