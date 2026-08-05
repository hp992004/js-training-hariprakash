import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import HowWeWork from "./components/HowWeWork/HowWeWork";
import Templates from "./components/Templates/Templates";
import Pricing from "./components/Pricing/Pricing";
import Portfolio from "./components/Portfolio/Portfolio"
import Testimonials from "./components/Testimonials/Testimonials";
import PlanWebsite from "./components/PlanWebsite/PlanWebsite";
import BookCall from "./components/BookCall/BookCall";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <HowWeWork />
      <Templates />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <PlanWebsite />
      <BookCall />
      <Footer />
    </>
  );
}

export default App;