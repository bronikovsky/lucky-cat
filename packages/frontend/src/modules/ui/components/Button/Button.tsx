import './global.scss';
import * as React from 'react';
import { Logger } from '../../utils';
import { useTheme } from '../../contexts';
import classes from './Button.module.scss';
import classnames from 'classnames';
import Svg from '../Svg';

const logger = new Logger('Button');

export type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  /**
   * For color props, any valid CSS value can be passed, variable names can omit `var` - `--name` will be
   * automatically converted into `var(--name)`.
   *
   * For default text color use `--button-text-dark` or `--button-text-light`.
   * For embedded background color use `--button-embedded-darker` or `--button-embedded-lighter`.
   */
  background?: string;
  /** See `background` prop. */
  color?: string;
  /** See `background` prop. */
  hoverBackground?: string;

  hoverEffect?: 'lighten' | 'darken';

  loading?: boolean;

  fullWidth?: boolean;
  justify?: 'left' | 'right' | 'center';
  StartIcon?: React.ComponentType<{ className: string }>;
}

const getId = (() => {
  let id = 0;

  return () => `b${id++}`;
})();

function getColorStyleValue(color: string): string {
  return color.startsWith('#') ? color : (color.startsWith('--') ? `var(${color})` : color);
}

const Button = (props: Props): React.ReactElement => {
  const theme = useTheme();
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
  const defaultHoverEffect = `${oppositeTheme}en`;
  const defaultColor = `--button-text-${oppositeTheme}`;
  const defaultBackground = `--button-embedded-${oppositeTheme}en`;

  const {
    id: _id,
    StartIcon,
    className,
    children,
    color = defaultColor,
    background = defaultBackground,
    hoverBackground,
    hoverEffect = defaultHoverEffect,
    loading,
    fullWidth,
    justify = 'center',
    ...buttonProps
  } = props;

  if (hoverBackground && props.hoverEffect && process.env.NODE_ENV !== 'production') {
    logger.warn('Using `hoverEffect` prop with `hoverBackground` - `hoverEffect` will not be applied.');
  }

  const id = React.useMemo(() => {
    return _id || getId();
  }, [_id]);

  React.useLayoutEffect(() => {
    if (hoverEffect) {
      const style = document.createElement('style');
      const hoverBg = hoverBackground || (hoverEffect === 'lighten' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');

      style.innerHTML = `
        #${id} {
          background-color: ${getColorStyleValue(background)};
          color: ${getColorStyleValue(color)};
        }
        #${id}[disabled] {
          background-color: ${getColorStyleValue(defaultBackground)} !important;
          color: ${getColorStyleValue(defaultColor)} !important;
        }
        #${id}:hover:not([disabled]) {
          background-image: linear-gradient(${hoverBg}, ${hoverBg});
        }
      `;
      document.head.appendChild(style);

      return () => { document.head.removeChild(style); };
    }
  }, [id, hoverEffect, background, color, defaultBackground, defaultColor, hoverBackground]);

  const conditionalClasses = { [classes.fullWidth]: fullWidth };
  const rootClass = classnames(classes.root, className, classes[justify], conditionalClasses);

  return (
    <button id={id} type={'button'} className={rootClass} {...buttonProps}>
      {loading ? (
        <Svg viewBox={'0 0 24 24'} className={classnames(classes.loading, classes.icon)}>
          <circle r={10} cx={12} cy={12} strokeWidth={2} stroke={'currentColor'} fill={'none'} strokeDasharray={100}>
            <animate attributeName={'stroke-dashoffset'} values={'184;0'} dur={'1.8s'} repeatCount={'indefinite'}/>
          </circle>
        </Svg>
      ) : StartIcon && <StartIcon className={classes.icon}/>}
      <span>
        {children}
      </span>
    </button>
  );
};

export default Button;
