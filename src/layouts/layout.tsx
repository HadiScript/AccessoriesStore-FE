import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import React from "react";

type props = {
  children: React.ReactNode;
  isHero?: boolean;
};

const Layout = ({ children, isHero = false }: props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
