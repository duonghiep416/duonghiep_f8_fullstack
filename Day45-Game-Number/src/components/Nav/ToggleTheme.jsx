import { useLayoutEffect, useState } from 'react'
import darkImg from '../../assets/dark-mode.png'
import lightImg from '../../assets/light-mode.png'
function ToggleTheme() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  )
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  useLayoutEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  return (
    <>
      <div className='ct-dark-mode-toggle' onClick={toggleDarkMode}>
        <img
          src={darkMode ? lightImg : darkImg}
          className='w-6 h-6 object-cover select-none'
        />
      </div>
    </>
  )
}
export default ToggleTheme
