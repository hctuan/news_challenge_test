import React, { useState } from 'react';

export const useComboState = (initialState: any) => {
  const [state, _setState] = useState(initialState);
  const setState = (newState: any) => _setState((old: any) => ({ ...old, ...newState }));
  return [state, setState]
}