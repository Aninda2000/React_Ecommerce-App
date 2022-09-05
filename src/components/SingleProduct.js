import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteproduct, updateproduct } from "../features/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product(props) {
  const dispatch = useDispatch();

  function handelupdate(id) {
    const item = {
      id: id,
      title: title,
      price: price,
      rating: rating,
      image: image,
    };
    console.log("item", item);
    dispatch(updateproduct({ id: id, item: item }));
    toast("Changes Saved!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  const handeldelete = (id) => {
    dispatch(deleteproduct(id));
    toast.info(" Product deleted!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const { item } = props;
  const [edit, Setedit] = useState(false);
  const [title, Settitle] = useState(item.title);
  const [price, Setprice] = useState(item.price);
  const [rating, Setrating] = useState(item.rating);
  const [image] = useState(item.image);

  return (
    <div key={item.id}>
      <ToastContainer />
      {edit ? (
        <div id="items">
          <div id="itemimg">
            <img src={item.image} alt={title} />
          </div>
          <div id="specs">
            <h3>
              <input
                type="text"
                value={title}
                onChange={(e) => Settitle(e.target.value)}
              />
            </h3>
            <p>
              <input
                type="number"
                value={price}
                onChange={(e) => Setprice(e.target.value)}
              />
            </p>
            <p>
              <input
                type="text"
                value={rating}
                onChange={(e) => Setrating(e.target.value)}
              />
            </p>
            <button
              className="btn btn-success"
              onClick={() => handelupdate(item.id)}
            >
              {" "}
              Save{" "}
            </button>
            <button className="btn btn-warning" onClick={() => Setedit(false)}>
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div id="items">
            <div id="itemimg">
              <img src={item.image} alt={title} />
            </div>
            <div id="specs">
              <h3>{item.title}</h3>
              <p>Price: {item.price} $</p>
              <p>Rating :{item.rating}</p>
              <Link to={`/details/${item.id}`}> Details </Link>
              <button className="btn btn-info" onClick={() => Setedit(true)}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handeldelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Product;
