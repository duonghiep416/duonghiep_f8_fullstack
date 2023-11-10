import { useReducer } from 'react'
import Context from './CountContext'
import reducer, { initState } from './CountReducer'
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export default Provider
