import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main id="main-content">
        <HeroSection />
        <section id="projects"></section>
        <section id="about"></section>
        <section id="contact"></section>
      </main>
    </>
  );
}
