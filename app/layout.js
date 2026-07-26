import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

export const metadata = {
  title: 'Grace Plus - Flowers & Ornamental Plants',
  description: 'Browse beautiful flowers and ornamental plants at Grace Plus Nursery.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Navbar />
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
    }
