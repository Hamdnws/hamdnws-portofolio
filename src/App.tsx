import { Suspense, useEffect } from 'react';
import { Toaster } from 'sonner';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-neon-blue/20 border-t-neon-blue rounded-full animate-spin" />
  </div>
);

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="relative min-h-screen bg-dark text-white overflow-x-hidden">
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Journey />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </div>
    </Suspense>
  );
}

export default App;
