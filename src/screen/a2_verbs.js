import words from '../../models/a2_verbs';
import IndexScreen from './index';
import React from 'react';

const A2Verbs = ({route}) => (
  <IndexScreen key={route.params.source} words={words} />
);
export default A2Verbs;
