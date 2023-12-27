import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProductForm() {
  const navigate = useNavigate();
  const [submitName, setSubmitName] = useState("");
  const [submitImage, setSubmitImage] = useState("");
  const [submitPrice, setSubmitPrice] = useState("");
  const [submitDesc, setSubmitDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    creatProduct();
  };

  const creatProduct = async () => {
    await axios.post("http://localhost:4001/products", {
      name: submitName,
      price: submitPrice,
      image: submitImage,
      description: submitDesc,
    });
    navigate("/");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={(e) => {
              setSubmitName(e.target.value);
            }}
            value={submitName}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            onChange={(e) => {
              setSubmitImage(e.target.value);
            }}
            value={submitImage}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            onChange={(e) => {
              setSubmitPrice(e.target.value);
            }}
            value={submitPrice}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            onChange={(e) => {
              setSubmitDesc(e.target.value);
            }}
            value={submitDesc}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateProductForm;
