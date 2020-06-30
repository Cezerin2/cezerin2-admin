import { render } from "@testing-library/react"
import React from "react"
import App from "./app"

test("renders dashboard", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Dashboard/i)
  expect(linkElement).toBeInTheDocument()
})
