import React, { useEffect, useState } from 'react';
import { BentoGrid } from './components/BentoGrid';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-purple-200 selection:text-purple-900 font-sans relative overflow-hidden">
      
      {/* Interactive Liquid Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* White base to make colors pop */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Pastel Blobs - Using mix-blend-multiply for watercolor blending effect on light bg */}
        <div className="absolute top-0 -left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-3000"></div>
        
        {/* Interactive Mouse Blob */}
        <div 
          className="absolute w-80 h-80 bg-blue-300/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${mousePosition.x - 160}px, ${mousePosition.y - 160}px)`,
          }}
        ></div>
        
        {/* Frosted Glass Overlay - Lighter for pastel theme */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[60px]"></div>
      </div>
      
      <main className="relative z-10 py-12 md:py-20">
        <BentoGrid />
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-8 py-12 text-center text-slate-500 text-sm font-medium tracking-wide">
        <p>&copy; 2026 Chunwen Wang All Rights Reserved</p>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;