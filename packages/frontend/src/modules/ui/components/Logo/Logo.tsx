import * as React from 'react';
import classes from './Logo.module.scss';
import classnames from 'classnames';
import Svg from '../Svg';

type Props = {
  className?: string;
  withText?: boolean;
}

const Logo = (props: Props): React.ReactElement => {
  const { className, withText = false } = props;
  const viewBoxX = withText ? 1700 : 532;

  return (
    <div className={classnames(classes.root, className)}>
      <Svg viewBox={`0 0 ${viewBoxX} 370`}>
        {/* eslint-disable-next-line max-len */}
        <path fill={'currentColor'} d={'M287 246c-34 56-107 74-163 41l-2-2 163-163 48-48a185 185 0 1 0 17 195l-63-23zM185 66c17 0 34 4 50 11L77 235A119 119 0 0 1 185 66z'}/>
        <circle fill={'currentColor'} cx={'461'} cy={'320'} r={'50'}/>
        {withText && (
          <text transform={'translate(573 272)'} className={classes.text}>
            EXAMINE
          </text>
        )}
      </Svg>
    </div>
  );
};

export default Logo;
