import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../components/Input";
import { getDataById, updateData } from "../../app/features/actions";
import { useDispatch, useSelector } from "react-redux";
import * as Validator from 'validatorjs';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  const [image, setImage] = useState({});
  const [check, setCheck] = useState(false);
  let { id } = useParams();
  const { product } = useSelector(state => state.dataProduct);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  let optionsTrue;

  const [value, setValue] = useState({
    name: '',
    price: 0,
    stock: 0,
    oldUrlImg: '',
  });

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    if (product) {
      setValue({
        ...value,
        name: product.name,
        price: product.price,
        stock: product.stock,
        oldUrlImg: product.image_url,
      });
      setCheck(product.status);
    }
  }, [product]);

  const getProductById = async () => {
    const data = await getDataById(id);
    dispatch(data);
  }

  const handleError = async (validation) => {
    validation.passes();
    if (Object.keys(validation.errors.errors).length !== 0) {
      await setErrors({
        ...errors,
        name: validation.errors.get('name')[0],
        price: validation.errors.get('price')[0],
        stock: validation.errors.get('stock')[0],
      });
    } else {
      setErrors({});
      var formData = new FormData();
      formData.append("image", image);
      formData.append("name", value.name);
      formData.append("price", value.price);
      formData.append("stock", value.stock);
      formData.append("status", check);
      try {
        await updateData(formData, id);
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await {
      ...value,
      name: value.name,
      price: value.price,
      stock: value.stock,
    }
    let rules = {
      name: 'required',
      price: 'required',
      stock: 'required',
    }

    let validation = new Validator(data, rules);
    handleError(validation);
  }

  const handleInput = (event) => {
    setValue((prevValue) => ({ ...prevValue, [event.target.name]: event.target.value }));
  }

  let spanName = errors.name !== undefined ? <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{errors.name}</span> : <span></span>;
  let spanPrice = errors.price !== undefined ? <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{errors.price}</span> : <span></span>;
  let spanStock = errors.stock !== undefined ? <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{errors.stock}</span> : <span></span>;

  if (!product) {
    return null;
  } else {
    if (check) {
      optionsTrue = <><option value="true" selected>Aktif</option><option value="false">Tidak Aktif</option></>;
    } else {
      optionsTrue = <><option value="true">Aktif</option><option value="false" selected>Tidak Aktif</option></>;
    }
  }


  return (

    <div className="main" >
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <Input name="name" type="text" onChange={handleInput} placeholder="Nama Produk..." label="Nama" value={value.name} />
          {spanName}
          <Input name="price" type="number" onChange={handleInput} placeholder="Harga Produk..." label="Harga" value={value.price} />
          {spanPrice}
          <Input name="stock" type="number" onChange={handleInput} placeholder="Stock Produk..." label="Stock" value={value.stock} />
          {spanStock}<br />
          <img src={value.oldUrlImg} width={"200px"} height={"200px"} alt={`img-${value.oldUrlImg}`} id="img" />
          <Input name="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
          {/* <Input name="status" type="checkbox" checked={check} onChange={(e) => setCheck(e.target.value)} label="Active" /> */}
          <select className="form-select" name="status" onChange={(e) => setCheck(e.target.value)} defaultValue="Select">
            <option value="Select" disabled>~ Select ~</option>
            {optionsTrue}
          </select>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;