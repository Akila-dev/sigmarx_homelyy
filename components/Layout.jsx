import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Real Estate</title>
      </Head>
      <div className="mx-auto xl:max-w-[1280px] xl:px-0 px-5 md:px-10 lg:px-16">
        <header className="fixed w-full z-[1000] left-0 bg-white shadow-md rounded-b-xl">
          <div className="mx-auto xl:max-w-[1280px] xl:px-0 px-5 md:px-10 lg:px-16 py-5">
            <Navbar />
          </div>
        </header>
        <main className="pt-[80px] md:pt-[80px]">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
