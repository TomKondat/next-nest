import { useState } from "react";
import HeroSection from "./HeroSection";
import PropertyList from "./PropertyList";

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({});

  const updateSearchParams = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <HeroSection updateSearchParams={updateSearchParams} />
      <PropertyList searchParams={searchParams} fromHomePage={true} />
    </div>
  );
};

export default HomePage;
