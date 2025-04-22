import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen bg-black text-white">
      {children}
    </main>
  );
};

export default Layout; 