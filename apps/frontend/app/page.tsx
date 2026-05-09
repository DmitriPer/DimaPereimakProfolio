import NavBar from './components/NavBar';

export default function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main id="main-content">
        <section id="hero"></section>
        <section id="projects"></section>
        <section id="about"></section>
        <section id="contact"></section>
      </main>
    </>
  );
}
