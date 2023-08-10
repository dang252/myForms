import './globals.css'
import { Inter } from 'next/font/google'

//fa
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

//context
import Context from './context';


import Navbar from './components/navbar'
import Footer from './components/footer'
import LoadingModal from './components/loading-modal';
import ReduxProvider from './redux/provider';

const inter = Inter({ subsets: ['latin'], weight: '400', })

export const metadata = {
  title: {
    default: 'My Forms',
    template: '%s | My Forms',
  },
  description: 'Create your own forms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <Context>
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
            <LoadingModal />
          </ReduxProvider>
        </Context>
      </body>
    </html>
  )
}
