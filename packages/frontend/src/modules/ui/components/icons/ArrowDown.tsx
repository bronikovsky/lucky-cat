import * as React from 'react';
import Svg from '../Svg';

const ArrowDown = (): React.ReactElement => {
  return (
    <Svg viewBox={'0 0 24 24'} style={{ transform: 'rotate(180deg)' }}>
      <rect x={'9.75701'} y={'11.5'} width={'4.52337'} height={'7.20737'} fill={'currentColor'}/>
      {/* eslint-disable-next-line max-len */}
      <path d={'M11.1995 5.40068C11.5995 4.86644 12.4005 4.86644 12.8005 5.40068L17.7308 11.9861C18.2245 12.6455 17.754 13.5855 16.9303 13.5855H7.06967C6.24602 13.5855 5.77553 12.6455 6.26916 11.9861L11.1995 5.40068Z'} fill={'currentColor'}/>
    </Svg>
  );
};

export default ArrowDown;
