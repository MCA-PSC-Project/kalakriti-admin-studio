import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import BannerCarouselAdmin from "../components/BannerCarouselAdmin";
import Loading from "../components/loading/Loading"; // import the Loading component
import api from "../utils/api";

function Banners() {
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [bannersList, setBannersList] = useState([]);

  useEffect(() => {
    api
      .get(`/banners`)
      .then((response) => {
        setBannersList(response.data === null ? [] : response.data);
        console.log(response.data);
        setIsLoading(false); // set isLoading to false when the data has been fetched
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // set isLoading to false even if there is an error
      });
  }, []);

  return (
    <>
      {isLoading ? ( // display the Loading component while the data is being fetched
        <Loading />
      ) : (
        <>
          <NavBar />
          <h1>Banners</h1>
          <BannerCarouselAdmin
            onBannersLoad={(index, bannerId) => {
              console.log({ index, bannerId });
            }}
          />
        </>
      )}
      {bannersList && bannersList.length > 0 ? (
        bannersList.map((banner, index) => {
          return (
            <>
              <div>
                <h2>Banner {index + 1}</h2>
                <Banner banner={banner} />
              </div>
            </>
          );
        })
      ) : (
        <h2>No banners</h2>
      )}
    </>
  );
}

function Banner({ banner }) {
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(banner.media.path);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <img
            src={image}
            className="d-block w-100"
            alt="banner"
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <form>
            <div className="form-group">
              <label>Banner id: {banner.id}</label>
            </div>
            <div className="form-group">
              <label>Redirect type</label>
              <input
                type="text"
                className="form-control"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label>Redirect URL</label>
              <input
                type="text"
                className="form-control"
                disabled={!editMode}
              />
            </div>
            {editMode ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {}}
                >
                  Save
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.bmp"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                 
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Banners;
