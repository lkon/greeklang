import words from '../../models/prefixes';
import IndexScreen from './index';
import React from 'react';

const Prefixes = ({route}) => (
  <IndexScreen key={route.params.source} words={words} />
);
export default Prefixes;
