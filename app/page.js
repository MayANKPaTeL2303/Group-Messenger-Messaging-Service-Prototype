//Home page
import Box from "./components/Box";
import Block from "./components/Block";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row p-40 space-x-10">
        <Block />
        <Box />
      </div>
      <Footer />
    </div>
  );
}
