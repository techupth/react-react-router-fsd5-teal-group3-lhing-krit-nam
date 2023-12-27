import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewProductPage() {
  // สร้างstate ขึ้นมารับค่าข้อมูลที่เราดึงมาจากserver
  const [callName, setCallName] = useState("");
  const [callImage, setCallImage] = useState("");
  const [callPrice, setCallPrice] = useState("");
  const [callDesc, setCallDesc] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const getProductList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/products/${params.productId}`
      );
      // กำหนดให้ setState execute ข้อมูลแต่ละid ที่ขอมาจาก server
      setCallName(response.data.data.name);
      setCallImage(response.data.data.image);
      setCallPrice(response.data.data.price);
      setCallDesc(response.data.data.description);
    } catch (error) {
      console.log("CALL DATA ERROR");
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <div className="product-preview">
          <img src={callImage} alt="product-image" width="350" height="350" />
        </div>
        <h2>{callName}</h2>
        <p>Price:$ {callPrice}</p>
        <p>{callDesc}</p>
      </div>

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ViewProductPage;
