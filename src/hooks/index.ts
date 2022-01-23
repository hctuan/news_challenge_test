import React, { useState } from 'react';

export const useComboState = (initialState: Object) => {
  const [state, _setState] = useState(initialState);
  const setState = (newState: Object) => _setState((old: Object) => ({ ...old, ...newState }));
  return [state, setState]
}