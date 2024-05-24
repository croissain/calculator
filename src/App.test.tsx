import { render } from "@testing-library/react"
import App from "./App"

describe('App component loads correctly', () => {
  const { container } = render(<App />)
  const { firstChild } = container
  test('renders correctly', () => {
      expect(container).toHaveTextContent(`Home`)
  })

  test('first child should contain class "navbar"', () => {
      expect(firstChild).toHaveClass(`navbar`)
  })
})