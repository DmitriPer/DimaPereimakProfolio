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
        <section id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
        </section>
        <section id="about"></section>
        <section id="contact"></section>
      </main>
    </>
  );
}
