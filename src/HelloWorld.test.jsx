import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelloWorld from './HelloWorld.jsx';

describe('HelloWorld Component', () => {
  it('renders the correct greeting message dynamically', () => {
    // 1. Render the component and pass it a fake prop
    render(<HelloWorld name="Testing Bear" />);

    // 2. Search the virtual DOM for the exact text we expect to see
    const messageElement = screen.getByText('Hello, Testing Bear!');

    // 3. Assert that the text successfully made it onto the screen
    expect(messageElement).toBeInTheDocument();
  });
});
