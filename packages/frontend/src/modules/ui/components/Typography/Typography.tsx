import * as React from 'react';
import { Logger } from '../../utils';
import classes from './Typography.module.scss';
import classnames from 'classnames';

const logger = new Logger('Typography');

export type Props = {
  children: NonNullable<React.ReactNode>;
  className?: string;
  style?: React.CSSProperties;
  element?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'heading' | 'subheading' | 'button' | 'overline' | 'body' | null;

  /** Render children as HTML */
  html?: boolean;
  /** Any defined CSS variable, defaults to `e-typography-color` */
  color?: string;
}

/**
 * Basic text display component.
 *
 * Can be styled
 */
const Typography = (props: Props): React.ReactElement => {
  const { children, className, html, style, color, element: Element = 'div', variant = 'body' } = props;
  const rootClass = classnames(classes.root, variant && classes[variant], html && classes.html, className);

  const rootStyle = React.useMemo(() => {
    return { color: `var(--${color || 'e-typography-color'})`, ...(style || {}) };
  }, [color, style]);

  const commonProps = { style: rootStyle, className: rootClass };

  if (typeof children !== 'string') {
    if (html) {
      logger.warn('Cannot render non-string children as html.');
    }

    return (
      <Element {...commonProps}>
        {children}
      </Element>
    );
  }

  return (
    <Element {...commonProps} dangerouslySetInnerHTML={{ __html: children }}/>
  );
};

export default Typography;
