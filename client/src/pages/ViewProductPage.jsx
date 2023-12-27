import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewProductPage() {
  const navigate = useNavigate();
  // State ของข้อมูลแต่ละอัน
  const [viewName, setViewName] = useState("");
  const [viewDescription, setViewdescription] = useState("");
  const param = useParams();
  // เรียกข้อมูล
  const getProduct = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/products/${param.productId}`
      );
      setViewName(result.data.data.name);
      setViewdescription(result.data.data.description);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>{viewName}</h2>
        <p>{viewDescription}</p>
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
