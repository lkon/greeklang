import words from '../../models/featro';
import IndexScreen from './index';
import React from 'react';

const Featro = ({route}) => (
  <IndexScreen key={route.params.source} words={words} />
);
export default Featro;
