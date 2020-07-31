import words from '../../models/run-out';
import IndexScreen from './index';
import React from 'react';

const RunOut = ({route}) => (
  <IndexScreen key={route.params.source} words={words} />
);
export default RunOut;
