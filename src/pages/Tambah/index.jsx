
import { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';
import * as Validator from 'validatorjs';
import FormData from 'form-data';
import { postData } from '../../app/features/actions';
import { useHistory } from "react-router-dom";

const Tambah = () => {
  const history = useHistory();
  const [value, setValue] = useState({
    name: '',
    price: 0,
    stock: 0,
  });

  const [image, setImage] = useState({});
  const [check, setcheck] = useState(false);
  const [errors, setErrors] = useState({});

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
        await postData(formData);
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await {
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
    handleError(validation)
  }

  const handleInput = (event) => {
    const newObject = { ...value, [event.target.name]: event.target.value }
    setValue(newObject);
  }

  let spanName = errors.name !== undefined ? <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{errors.name}</span> : <span></span>;
  let spanPrice = errors.price !== undefined ? <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{errors.price}</span> : <span></span>;
  let spanStock = errors.stock !== undefined ? <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{errors.stock}</span> : <span></span>;

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <Input name="name" type="text" onChange={handleInput} placeholder="Nama Produk..." label="Nama" style={{ marginBottom: '5px' }} />
          {spanName}
          <Input name="price" type="number" onChange={handleInput} placeholder="Harga Produk..." label="Harga" style={{ marginBottom: '5px' }} />
          {spanPrice}
          <Input name="stock" type="number" onChange={handleInput} placeholder="Stock Produk..." label="Stock" style={{ marginBottom: '5px' }} />
          {spanStock}
          <Input name="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
          <Input name="status" type="checkbox" onChange={(e) => setcheck(e.target.checked)} label="Active" />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;