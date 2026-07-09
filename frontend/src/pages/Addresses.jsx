import "../styles/Addresses.css";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../services/api";

function Addresses() {

  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {

    try {

      const response = await api.get("/addresses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAddresses(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addAddress = async () => {

    try {

      await api.post(
        "/addresses/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Address Added Successfully");

      setForm({
        full_name: "",
        phone: "",
        address_line: "",
        city: "",
        state: "",
        pincode: ""
      });

      fetchAddresses();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteAddress = async (id) => {

    try {

      await api.delete(
        `/addresses/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchAddresses();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="address-container">

      <h1 className="address-title">

        📍 My Addresses

      </h1>

      <div className="address-form">

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="address_line"
          placeholder="Address"
          value={form.address_line}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <button
className="address-btn"
onClick={addAddress}
>

          ➕ Add Address

        </button>

      </div>

      {addresses.map((address) => (

        <div
          className="address-card"
          key={address.id}
        >

          <h3>

            {address.full_name}

          </h3>

          <p>

            📞 {address.phone}

          </p>

          <p>

            🏠 {address.address_line}

          </p>

          <p>

            {address.city}, {address.state}

          </p>

          <p>

            PIN : {address.pincode}

          </p>

          <button
            className="delete-btn"
            onClick={() => deleteAddress(address.id)}
          >

            🗑 Delete

          </button>

        </div>

      ))}

    </div>

  );

}

export default Addresses;