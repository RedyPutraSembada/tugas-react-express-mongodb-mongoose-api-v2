import { Link } from "react-router-dom";
import './index.scss';
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getDataById } from "../../app/features/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  let { product } = useSelector(state => state.dataProduct);
  let { id } = useParams();
  const dispatch = useDispatch();


  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const data = await getDataById(id);
    dispatch(data);
  }
  if (!product) {
    return null;
  }
  return (

    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {rupiah(product.price)}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
          <tr>
            <td>Image :</td>
            <td>
              <img src={product.image_url} width={"200px"} height={"200px"} alt={`img-${product.image_url}`} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;