import React, { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import api from "../utils/api";
import NavBar from "../components/NavBar";
import profilePicSample from "../assets/profilePicSample.jpg";

const Customers = () => {
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api
      .get(`/customers`)
      .then((response) => {
        setCustomers(response.data === null ? [] : response.data);
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
          <h1>Customers</h1>
          <div className="container">
            <ul className="list-group">
              {customers.map((customer) => (
                <li className="list-group-item mb-3 border border-3">
                  <div className="row">
                    <div className="col-sm-2">
                      <img
                        src={customer.dp.path ?? profilePicSample}
                        alt={customer.name}
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="col-sm-10">
                      <h4>Id: {customer.id}</h4>
                      <p>First Name: {customer.first_name}</p>
                      <p>Last Name: {customer.last_name}</p>
                      <p>Email: {customer.email}</p>
                      <p>Mobile: {customer.mobile_no ?? "N/A"}</p>
                      <p>DOB: {customer.dob}</p>
                      <p>Gender: {customer.gender}</p>
                      <p>Enabled: {customer.enabled ? "true" : "false"}</p>
                      <p>Verified: {customer.is_verified ? "true" : "false"}</p>
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

export default Customers;
