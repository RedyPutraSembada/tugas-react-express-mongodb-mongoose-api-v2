import { Link } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import { deleteData, getData, getLike } from '../../app/features/actions';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
  let { productList } = useSelector(state => state.dataProduct);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataSearch = async (search) => {
    if (search === '') {
      getDataProduct();
    } else {
      const data = await getLike(search);
      console.log(data);
      dispatch(data);
    }
  }

  const getDataProduct = async () => {
    const data = await getData();
    dispatch(data);
  }

  const confirmDelete = (id) => {
    let result = window.confirm("Apakah Anda yakin untuk menghapus");
    if (result) {
      deleteData(id);
      window.location.reload()
    }
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" onChange={(e) => getDataSearch(e.target.value)} placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            productList.map((item, i) => (
              <tr key={`product-${i}`}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td className="text-right">{rupiah(item.price)}</td>
                <td className="text-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
                  <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <button onClick={event => confirmDelete(item._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;