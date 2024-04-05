import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className=" container mx-auto py-10 flex-1">{children}</div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Layout;