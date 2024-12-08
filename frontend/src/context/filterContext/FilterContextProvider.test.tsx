import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import FilterContextProvider, {FilterContext} from './';

describe('FilterContextProvider', () => {
  it('provides default context values', () => {
    render(
      <FilterContextProvider>
        <FilterContext.Consumer>
          {({checked, setChecked}) => (
            <>
              <div data-testid="checked-values">{checked.length}</div>
              <button onClick={() => setChecked(['test'])}>Set Checked</button>
            </>
          )}
        </FilterContext.Consumer>
      </FilterContextProvider>
    );

    expect(screen.getByTestId('checked-values')).toHaveTextContent('0');
  });

  it('updates checked values when setChecked is called', async () => {
    render(
      <FilterContextProvider>
        <FilterContext.Consumer>
          {({checked, setChecked}) => (
            <>
              <div data-testid="checked-values">{checked.length}</div>
              <button onClick={() => setChecked(['tag1', 'tag2'])}>Set Checked</button>
            </>
          )}
        </FilterContext.Consumer>
      </FilterContextProvider>
    );

    await waitFor(() => {
      screen.getByText('Set Checked').click();

      expect(screen.getByTestId('checked-values')).toHaveTextContent('2');
    })
  });
});
