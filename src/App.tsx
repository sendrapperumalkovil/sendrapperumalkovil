import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timings from './components/Timings';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Villages from './components/Villages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timings />
        <Events />
        <Gallery />
        <Villages />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
