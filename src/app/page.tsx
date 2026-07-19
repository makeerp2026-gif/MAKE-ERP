import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. Upar ka Navigation Bar */}
      <Header />

      {/* 2. Beech ka Main Content */}
      <main className="flex-grow">
        <Hero />
      </main>

      {/* 3. Niche ka Footer */}
      <Footer />
    </div>
  );
}