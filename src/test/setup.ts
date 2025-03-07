import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Clear local storage after each test
afterEach(() => {
  cleanup()
  localStorage.clear()
})
