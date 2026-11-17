import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: "Nick's Portfolio",
  description: 'Nick Hageman, software engineer at Apple. Projects in AI/ML, robotics, and AR/VR.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-inter">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
