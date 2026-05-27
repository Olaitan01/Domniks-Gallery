import { createContext, useCallback, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const TransitionContext = createContext({})

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const exitFnRef = useRef(null)
  const sharedImageDataRef = useRef(null)

  const registerExit = useCallback((fn) => {
    exitFnRef.current = fn
  }, [])

  const captureSharedImage = useCallback((el) => {
    if (!el) return
    sharedImageDataRef.current = { rect: el.getBoundingClientRect(), src: el.src }
  }, [])

  const peekSharedImage = useCallback(() => sharedImageDataRef.current, [])

  const clearSharedImage = useCallback(() => {
    sharedImageDataRef.current = null
  }, [])

  const navigateTo = useCallback(async (path) => {
    if (exitFnRef.current) {
      await exitFnRef.current(path)
      exitFnRef.current = null
    }
    navigate(path)
  }, [navigate])

  return (
    <TransitionContext.Provider value={{ registerExit, navigateTo, captureSharedImage, peekSharedImage, clearSharedImage }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(TransitionContext)
