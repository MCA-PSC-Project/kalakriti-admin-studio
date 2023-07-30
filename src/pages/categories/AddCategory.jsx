import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { compressImage } from "../../utils/common";
import api from "../../utils/api";
import Modal from "../../components/Modal";

function AddCategory() {
  const categoryNameRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [modalProperties, setModalProperties] = useState({});

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return (
    <>
      {showModal && (
        <Modal
          title={modalProperties.title}
          body={modalProperties.body}
          cancelButtonPresent={modalProperties.cancelButtonPresent}
          onClose={() => {
            if (modalProperties.onClose) {
              modalProperties.onClose();
            } else {
              // setShowModal(false);
            }
          }}
        />
      )}

      <NavBar />
      <h1 className="text-center">Add Category</h1>
      <div className="d-flex justify-content-center">
        <form>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category name:
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              ref={categoryNameRef}
              name="categoryName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Select image:
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  let img = event.target.files[0];
                  setSelectedImage(img);
                  setImageURL(URL.createObjectURL(img));
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            onClick={async (event) => {
              event.preventDefault();
              console.log(categoryNameRef.current.value);
              console.log(selectedImage);

              try {
                const compressedImage = await compressImage(selectedImage, 0.8);
                // console.log(`Original image filename: ${selectedImage.name}`);
                console.log(`Original image size: ${selectedImage.size} bytes`);
                console.log(
                  `Compressed image filename: ${compressedImage.name}`
                );
                console.log(
                  `Compressed image size: ${compressedImage.size} bytes`
                );

                // Upload the compressed image file to the server
                const formData = new FormData();
                // formData.append("file", selectedImage);
                formData.append("file", compressedImage);
                console.log("formdata= ", formData);
                api
                  .post(`/uploads/image`, formData, config)
                  .then((response) => {
                    if (response.status === 201) {
                      // console.log("image selected");
                      console.log("response=", response.data);
                      const mediaId = response.data.id;
                      api
                        .post(`/categories`, {
                          name: categoryNameRef.current.value,
                          parent_id: null,
                          cover_id: mediaId,
                        })
                        .then((response) => {
                          if (response.status === 201) {
                            console.log("category created successfully");
                            setShowModal(true);
                            setModalProperties({
                              title: "Message",
                              body: "category created successfully",
                              cancelButtonPresent: false,
                              onClose: () => {
                                setShowModal(false);
                                // window.location.reload();
                                navigate("/categories");
                              },
                            });
                          }
                        })
                        .catch((error) => {
                          console.error(
                            "Some error occured in creating category"
                          );
                          console.error(error);
                          setShowModal(true);
                          setModalProperties({
                            title: "Message",
                            body: "Some error occured in creating category",
                            cancelButtonPresent: false,
                            onClose: () => {
                              setShowModal(false);
                              window.location.reload();
                            },
                          });
                        });
                    }
                  })
                  .catch((error) => {
                    console.error("Some error occured in creating category");
                    console.error(error);
                    setShowModal(true);
                    setModalProperties({
                      title: "Message",
                      body: "Some error occured in creating category",
                      cancelButtonPresent: false,
                    });
                  });
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCategory;
