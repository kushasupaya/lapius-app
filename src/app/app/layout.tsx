import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-screen overflow-auto">
      {children}
    </main>
  );
};

export default DashboardLayout;
