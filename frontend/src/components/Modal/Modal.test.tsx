import React from 'react';
import {render, screen} from '@testing-library/react';
import Modal from './';

describe('Modal Component', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`
  });

  it('renders the modal when isOpen is true', () => {
    render(
      <Modal isOpen={true}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal isOpen={false}>
        <p data-testid="modal-content">Modal Content</p>
      </Modal>
    );

    const modal = screen.queryByTestId('modal-content');
    expect(modal).not.toBeInTheDocument();
  });
});