import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';
import LoginPage from './';
import useAuthStore from "../../stores/store";
import {userEvent} from "@testing-library/user-event";

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

jest.mock('../../services/auth.service', () => ({
  login: jest.fn(),
}));

jest.mock('../../stores/store', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    login: jest.fn(),
    token: null,
  })),
}));

describe('LoginPage', () => {
  const mockedLogin = jest.spyOn(authService, "login");
  const mockedToastError = jest.spyOn(toast, "error");
  const mockLogin = jest.fn();

  const renderComponent = () => {
    render(<MemoryRouter initialEntries={['/']}>
      <LoginPage/>
    </MemoryRouter>)
  }

  beforeEach(() => {
    // @ts-ignore
    (useAuthStore as jest.Mock).mockReturnValue({
      token: undefined,
      login: mockLogin,
      logout: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    renderComponent();

    expect(screen.getByTestId('login-title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    renderComponent();

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, {target: {value: "a"}});
    fireEvent.change(usernameInput, {target: {value: ""}});

    fireEvent.change(passwordInput, {target: {value: "a"}});
    fireEvent.change(passwordInput, {target: {value: ""}});

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid credentials', async () => {
    const mockToken = 'mockToken';
    mockedLogin.mockResolvedValue({token: mockToken});

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Username'), {target: {value: 'testuser'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: 'password'}});

    const button = screen.getByRole('button', {name: 'Login'});
    const user = userEvent.setup();
    await user.click(button);

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({username: 'testuser', password: 'password'});
      expect(mockLogin).toHaveBeenCalledWith(mockToken);
    });
  });

  test('shows error on invalid credentials', async () => {
    mockedLogin.mockRejectedValue({
      response: {data: {error: 'Invalid credentials'}},
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Username'), {target: {value: 'testuser'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: 'wrongpassword'}});

    const button = screen.getByRole('button', {name: 'Login'});
    const user = userEvent.setup();
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('displays toast on unexpected error', async () => {
    mockedLogin.mockRejectedValue(new Error('Something went wrong'));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Username'), {target: {value: 'testuser'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: 'wrongpassword'}});

    const button = screen.getByRole('button', {name: 'Login'});
    const user = userEvent.setup();
    await user.click(button);

    await waitFor(() => {
      expect(mockedToastError).toHaveBeenCalledWith('Something went wrong');
    });
  });
});
