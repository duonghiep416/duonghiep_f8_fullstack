import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from './components/Header'
import Footer from './components/Footer'
import { SearchProvider } from './context/searchContext'
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
          <SearchProvider>
            <Header />
            {children}
            <Footer />
          </SearchProvider>
        </Providers>
      </body>
    </html>
  )
}
