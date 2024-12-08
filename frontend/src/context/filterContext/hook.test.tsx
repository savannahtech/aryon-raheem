import React from 'react';
import {act, renderHook} from '@testing-library/react';
import {FilterContext} from './';
import useFilterContext from './hook';

describe('useFilterContext', () => {
  it('returns checked and setChecked from the context', () => {
    const wrapper = ({children}: { children: React.ReactNode }) => (
      <FilterContext.Provider value={{checked: ['tag1'], setChecked: jest.fn()}}>
        {children}
      </FilterContext.Provider>
    );

    const {result} = renderHook(() => useFilterContext(), {wrapper});

    expect(result.current.tags).toEqual(['tag1']);
  });

  it('allows updating tags via setTags', () => {
    const setCheckedMock = jest.fn();
    const wrapper = ({children}: { children: React.ReactNode }) => (
      <FilterContext.Provider value={{checked: ['tag1'], setChecked: setCheckedMock}}>
        {children}
      </FilterContext.Provider>
    );

    const {result} = renderHook(() => useFilterContext(), {wrapper});

    act(() => {
      result.current.setTags(['tag2']);
    });

    expect(setCheckedMock).toHaveBeenCalledWith(['tag2']);
  });
});
