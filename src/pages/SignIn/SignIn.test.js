import { render, screen } from "@testing-library/react"
import SignIn from './SignIn'

test('Welcome back text render', () => {
    render(<SignIn />)
    const welcomeBackElement = screen.getByText('Welcome back');
    expect(welcomeBackElement).toBeInTheDocument();
}) 