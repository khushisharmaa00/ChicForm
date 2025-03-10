import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens_kurta";
import { shirt } from "../../../Data/shirt";
import { men_jeans } from "../../../Data/men_jeans";
import { women_dress } from "../../../Data/women_dress";
import { women_jeans } from "../../../Data/women_jeans";

const Homepage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel data={mens_kurta} sectionName={"Mens's Kurta"} />
        <HomeSectionCarousel data={shirt} sectionName={"Men's Shirts"} />
        <HomeSectionCarousel data={men_jeans} sectionName={"Men's jeans"} />
        <HomeSectionCarousel data={women_jeans} sectionName={"Women's jeans"} />
        <HomeSectionCarousel data={women_dress} sectionName={"Women's Dress"} />
      </div>
    </div>
  );
};

export default Homepage;
