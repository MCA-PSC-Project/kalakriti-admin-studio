import React, { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import api from "../utils/api";
import NavBar from "../components/NavBar";
import profilePicSample from "../assets/profilePicSample.jpg";

const Sellers = () => {
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    api
      .get(`/sellers`)
      .then((response) => {
        setSellers(response.data === null ? [] : response.data);
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
          <h1>Sellers</h1>
          <div className="container">
            <ul className="list-group">
              {sellers.map((seller) => (
                <li className="list-group-item mb-3 border border-3">
                  <div className="row">
                    <div className="col-sm-2">
                      <img
                        src={seller.dp.path ?? profilePicSample}
                        alt={seller.seller_name}
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="col-sm-10">
                      <h4>Id: {seller.id}</h4>
                      <p>Seller Name: {seller.seller_name}</p>
                      <p>Email: {seller.email}</p>
                      <p>Mobile: {seller.mobile_no ?? "N/A"}</p>
                      <p>GSTIN: {seller.GSTIN}</p>
                      <p>PAN: {seller.PAN}</p>
                      <p>Enabled: {seller.enabled ? "true" : "false"}</p>
                      <p>Verified: {seller.is_verified ? "true" : "false"}</p>
                      {/* <div className="col-sm-2">
                        <img
                          src={seller.sign.path}
                          alt={seller.seller_name}
                          className="img-fluid rounded-circle"
                        />
                      </div> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sellers;
