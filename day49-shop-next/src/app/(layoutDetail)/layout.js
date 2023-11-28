import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
const inter = Inter({ subsets: ['latin'] })

export default function DetailLayout({ children }) {
  return (
    <>
      <h1>Đây là layout khác</h1>
      {children}
    </>
  )
}
