import React from "react";
import NavBar from "../components/NavBar";
import BannerCarouselAdmin from "../components/BannerCarouselAdmin";

function Banners() {
  return (
    <>
      <NavBar />
      <h1>Banners</h1>
      <BannerCarouselAdmin
        onBannersLoad={(index, bannerId) => {
          console.log({index, bannerId});
        }}
      />
    </>
  );
}

export default Banners;
