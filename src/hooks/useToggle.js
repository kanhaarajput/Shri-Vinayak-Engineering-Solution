import { useState, useCallback } from 'react'

/**
 * Manages a boolean toggle state with helpers.
 *
 * @param {boolean} initialValue
 * @returns {{ value: boolean, toggle: Function, setTrue: Function, setFalse: Function }}
 *
 * @example
 * const modal = useToggle(false)
 * <button onClick={modal.setTrue}>Open</button>
 * <Modal open={modal.value} onClose={modal.setFalse} />
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((v) => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}
