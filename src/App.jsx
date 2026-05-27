import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { TransitionProvider } from './context/TransitionContext'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Work from './pages/Work'

function AnimatedRoutes() {
  const location = useLocation()
  const wrapperRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
    )
  }, [location.pathname])

  return (
    <div ref={wrapperRef}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/work"    element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <TransitionProvider>
      <Header />
      <AnimatedRoutes />
    </TransitionProvider>
  )
}
