import * as React from 'react';

export default function useFocus(initial = false): [boolean, { onFocus: () => void, onBlur: () => void }] {
  const [focused, setFocused] = React.useState(initial);

  const onFocus = React.useCallback(() => setFocused(true), []);
  const onBlur = React.useCallback(() => setFocused(false), []);

  return [focused, { onFocus, onBlur }];
}
