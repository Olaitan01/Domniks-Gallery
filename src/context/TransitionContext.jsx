import { createContext, useCallback, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const TransitionContext = createContext({})

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const exitFnRef = useRef(null)

  const registerExit = useCallback((fn) => {
    exitFnRef.current = fn
  }, [])

  const navigateTo = useCallback(async (path) => {
    if (exitFnRef.current) {
      await exitFnRef.current()
      exitFnRef.current = null
    }
    navigate(path)
  }, [navigate])

  return (
    <TransitionContext.Provider value={{ registerExit, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(TransitionContext)
