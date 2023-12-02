import { Inter } from 'next/font/google'
import { i18n } from '../../../i18n.config'
import './globals.css'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const metadata = {
  title: 'Portfolio',
  description: 'Introduce myself and my projects'
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
