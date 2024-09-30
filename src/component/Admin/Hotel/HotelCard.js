import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import "./HotelCard.css";
import { useNavigate } from "react-router-dom";
const HotelCard = ({
  id,
  name = "test",
  phoneNo = "1235",
  address = "testing address",
  description = "test description",
  amenities = "test amenities",
  image,
  remove,
  update,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [nName, setNName] = useState(name);
  const [nDescription, setNDescription] = useState(description);
  const [nAmenities, setNAmenities] = useState(amenities);
  const [nImage, setNImage] = useState(image);
  const [nAddress, setNAddress] = useState(address);
  const [nPhoneNo, setNPhoneNo] = useState(phoneNo);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNImage(imageUrl);
    }
  };

  const handleUpdate = () => {
    const updatedData = {};

    if (nName !== name) {
      updatedData.name = nName;
    }

    if (nPhoneNo !== phoneNo) {
      updatedData.phoneNo = nPhoneNo;
    }

    if (nDescription !== description) {
      updatedData.description = nDescription;
    }

    if (nAddress !== address) {
      updatedData.address = nAddress;
    }

    if (nImage !== image) {
      updatedData.image = nImage;
    }

    if (nAmenities !== amenities) {
      updatedData.amenities = nAmenities;
    }
    if (Object.keys(updatedData).length > 0) {
      update(id, updatedData);
    }
    console.log(updatedData);
    setOpen(false);
  };

  const handleClose = () => {
    setNImage(image);
    setNDescription(description);
    setNName(name);
    setNAmenities(amenities);
    setNAddress(address);
    setNPhoneNo(phoneNo);
    setOpen(false);
  };

  const handleReserve = () => {
    navigate("/addBooking");
  };

  const handleCardClick = () => {
    navigate(`/room/${id}`);
  };

  return (
    <>
      <center>
        <div className="card">
          <img
            src={image}
            alt={image}
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          />
          <h3>Hotel Id :{id}</h3>
          <h2>{name}</h2>
          <p>{description}</p>
          <p> {amenities}</p>
          <p>
            {address} Phone No: {phoneNo}
          </p>
          <button onClick={() => remove(id)}>remove</button>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Update</Button>}
          >
            <input
              type="text"
              value={nName}
              placeholder={name}
              onChange={(e) => setNName(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={nDescription}
              placeholder={description}
              onChange={(e) => setNDescription(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={nAmenities}
              placeholder={amenities}
              onChange={(e) => setNAmenities(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={nAddress}
              placeholder={address}
              onChange={(e) => setNAddress(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={nPhoneNo}
              placeholder={phoneNo}
              onChange={(e) => setNPhoneNo(e.target.value)}
            />
            <label>Images (comma-separated URLs):</label>
            <input
              type="text"
              value={nImage}
              placeholder="Enter image URLs separated by commas"
              onChange={(e) => setNImage(e.target.value)}
            />
            <br />
            {nImage && (
              <img
                src={nImage}
                alt="New Image"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <br />
            <button onClick={handleUpdate}>confirm</button>
            <button onClick={handleClose}>cancel</button>
          </Modal>
          <button onClick={handleReserve}>reserve</button>
        </div>
      </center>
    </>
  );
};
export default HotelCard;
