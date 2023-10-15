import Link from "next/link";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>NavBar of Main layout</h1>
      <h3>
        <Link href="/profile">profile</Link>
      </h3>
      {children}
    </div>
  );
};

export default MainLayout;
