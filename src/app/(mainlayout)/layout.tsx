import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>NavBar Main layout</h1>
      {children}
    </div>
  );
};

export default MainLayout;
