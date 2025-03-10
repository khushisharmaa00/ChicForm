// import React, { useState } from "react";
// import AliceCarousel from "react-alice-carousel";
// import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
// import { Button } from "@mui/material";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

// const HomeSectionCarousel = ({ data, sectionName }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const responsive = {
//     0: { items: 1 },
//     720: { items: 3 },
//     1024: { items: 5.5 },
//   };

//   const slidePrev = () => setActiveIndex(activeIndex - 1);
//   const slideNext = () => setActiveIndex(activeIndex + 1);

//   const syncActiveIndex = ({ item }) => setActiveIndex(item);

//   const items = data
//     .slice(0, 10)
//     .map((item) => <HomeSectionCard product={item} />);

//   return (
//     <div className="border">
//       <h2 className="text-2xl font-extrabold text-gray-800 py-5">
//         {sectionName}
//       </h2>
//       <div className="relative p-5 border">
//         <AliceCarousel
//           items={items}
//           disableButtonsControls
//           responsive={responsive}
//           disableDotsControls
//           onSlideChange={syncActiveIndex}
//           activeIndex={activeIndex}
//           renderNextButton={() =>
//             activeIndex !== items.length - 5 ? (
//               <Button
//                 variant="contained"
//                 className="z-50 bg-white"
//                 onClick={slideNext}
//                 sx={{
//                   position: "absolute",
//                   top: "8rem",
//                   right: "0rem",
//                   transform: "translateX(50%) rotate(90deg)",
//                   bgcolor: "white",
//                 }}
//                 //   color="white"
//                 aria-label="next"
//               >
//                 <KeyboardArrowLeft
//                   sx={{ transform: "rotate(90deg)", color: "black" }}
//                 />
//               </Button>
//             ) : null
//           }
//           renderPrevButton={() =>
//             activeIndex !== 0 && (
//               <Button
//                 onClick={slidePrev}
//                 variant="contained"
//                 className="z-50 bg-white"
//                 sx={{
//                   position: "absolute",
//                   top: "8rem",
//                   left: "0rem",
//                   transform: "translateX(-50%) rotate(-90deg)",
//                   bgcolor: "white",
//                 }}
//                 //   color="white"
//                 aria-label="previous"
//               >
//                 <KeyboardArrowRight
//                   sx={{ transform: "rotate(90deg)", color: "black" }}
//                 />
//               </Button>
//             )
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default HomeSectionCarousel;

import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  // Sync active index on slide change
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // Prepare items for carousel
  const items = data
    .slice(0, 10)
    .map((item, index) => <HomeSectionCard key={index} product={item} />);

  const slidePrev = () => setActiveIndex(activeIndex - 1);

  const slideNext = () => setActiveIndex(activeIndex + 1);

  return (
    <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">
        {sectionName}
      </h2>
      <div className="relative p-5 border">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          onSlideChange={syncActiveIndex}
          activeIndex={activeIndex} // Keep AliceCarousel controlled by the activeIndex
          mouseTracking
        />

        {/* next Button */}
        {activeIndex < items.length - 1 && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateY(50%) rotate(90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowRight
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}

        {/* previous Button */}
        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateY(-50%) rotate(-90deg)",
              bgcolor: "white",
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeft
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
