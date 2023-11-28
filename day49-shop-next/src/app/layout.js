import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from './components/Header'
import Footer from './components/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shop App',
  description: 'Shop App'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
