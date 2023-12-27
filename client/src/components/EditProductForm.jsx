import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  /* สิ่งที่ต้องทำ
  1. สร้างสเตจในการเก็บข้อมูลใหม่ (คิดถูก)
  2. ต้องดึงข้อมูลจากเซิฟมาแก้ไข axios.put (ใช่ คิดถูก)
  3. หลังsubmit axios.post ให้อัพเดทค่าเข้าไปในเซิฟ < (ไม่ใช่) 
  ให้ใช้ get เรียกข้อมูลที่มีการอีพเดทไป re-renderใหม่ 
  4. เป็น form ใช้ event onSubmit และ event.preventDefault() เพื่อป้องกันการรีเฟรชจอ 
  ทำคล้ายๆ ตอนcreatePost*/

  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  /* สร้างfn มาใช้งาน axios ให้ไปแก้ไขข้อมูลใน server โดยใช้ params ในการชี้ไปว่าจะแก้ที่id นี้ 
  ไม่มีการเปลี่ยนแปลงในการทำงานด้านหน้าจึงไม่ต้องใช้ useEffect มาดักจับการเปลี่ยนแปลง */

  const editProducts = async () => {
    try {
      const newUpdateProducts = {
        name: editName,
        price: editPrice,
        image: editImage,
        description: editDesc,
      };
      await axios.put(
        `http://localhost:4001/products/${params.productId}`,
        newUpdateProducts
      );
      navigate("/");
    } catch (error) {
      console.log("ERROR UPDATE");
    }
  };

  /* เรียกข้อมูลจากเซิฟที่เกิดการเปลี่ยนแปลงมาแสดงผล */

  const getUpdateProducts = async () => {
    const response = await axios.get(
      `http://localhost:4001/products/${param.productId}`
    );
    setEditName(response.data.data.name);
    setEditImage(response.data.data.image);
    setEditPrice(response.data.data.price);
    setEditDesc(response.data.data.description);
  };

  useEffect(() => {
    getUpdateProducts();
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    editProducts();
  };

  return (
    <form className="product-form" onSubmit={handleEdit}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={(e) => {
              setEditName(e.target.value);
            }}
            value={editName}
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
              setEditImage(e.target.value);
            }}
            value={editImage}
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
              setEditPrice(e.target.value);
            }}
            value={editPrice}
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
              setEditDesc(e.target.value);
            }}
            value={editDesc}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
