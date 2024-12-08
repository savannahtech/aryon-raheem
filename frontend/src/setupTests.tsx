// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {TextEncoder} from 'node:util'

global.TextEncoder = TextEncoder

jest.mock('@iconify/react', () => ({
  Icon: ({icon, ...props}: { icon: string }) => (
    <span data-testid="icon" {...props}>{icon}</span>
  )
}));

jest.mock('react-hot-toast');

jest.mock('axios');

jest.mock("./services/api.service", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
