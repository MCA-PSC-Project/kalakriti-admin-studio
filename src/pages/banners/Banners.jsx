import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import BannerCarouselAdmin from "../../components/BannerCarouselAdmin";
import Loading from "../../components/loading/Loading"; // import the Loading component
import api from "../../utils/api";
import Modal from "../../components/Modal";

function Banners() {
  const navigate = useNavigate();
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
          <h1 style={{ backgroundColor: "#FC4FCE", textAlign: "center" }}>
            Banners
          </h1>
          <div className="new-button">
            <button
              type="button"
              className="raise btn btn-warning btn-lg"
              onClick={() => {
                navigate(`/banners/add`);
              }}
            >
              + Add New Banner
            </button>
          </div>

          <BannerCarouselAdmin />
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

  const [showModal, setShowModal] = useState(true);
  const [modalProperties, setModalProperties] = useState({});

  return (
    <>
      {showModal && (
        <Modal
          title={modalProperties.title}
          body={modalProperties.body}
          cancelButtonPresent={modalProperties.cancelButtonPresent}
          onClose={() => {
            if (modalProperties.onClose) {
              console.log("inside onclose()");
              modalProperties.onClose();
            } else {
              setShowModal(false);
              window.location.reload();
            }
          }}
        />
      )}

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
                 
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                  onClick={() => {
                    api
                      .delete(`/banners/${banner.id}`)
                      .then((response) => {
                        if (response.status === 200) {
                          console.log("banner deleted successfully");
                          setShowModal(true);
                          setModalProperties({
                            title: "Message",
                            body: "banner deleted successfully",
                            cancelButtonPresent: false,
                            onClose: () => {
                              setShowModal(false);
                              window.location.reload();
                            },
                          });
                        }
                      })
                      .catch((error) => {
                        console.error("Some error occured in deleting banner");
                        console.error(error);
                        setShowModal(true);
                        setModalProperties({
                          title: "Message",
                          body: "Some error occured in deleting banner",
                          cancelButtonPresent: false,
                          onClose: () => {
                            setShowModal(false);
                            window.location.reload();
                          },
                        });
                      });
                  }}
                >
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
