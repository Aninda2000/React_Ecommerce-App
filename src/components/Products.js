import React, {  useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {  fetchproducts, sortAction, unsortAction } from '../features/productSlice'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleProduct from './SingleProduct';

function Products() {
    const data = useSelector(state => state.myproduct)
  const dispatch = useDispatch()

  const [sort,Setsort] = useState("Sort by Price")
  const [xxx,Setxxx] = useState()
  const [val,SetVal]= useState(true)
 

  function fetch(){
    dispatch(fetchproducts())
  }

  function handelsort(){
    SetVal(!val)
   Setsort("Sorted")
   Setxxx("❌")
   dispatch(sortAction())
  }

   function handelunsort(){
    Setsort("Sort by Price")
    Setxxx()
   dispatch(unsortAction())
  }

  return (
    <div className='container'>
      <ToastContainer />
      <h2>List of Products</h2>
      <div id='btn'>
          <div> <button onClick={fetch} className='btn btn-light'>Get Products</button></div>
          <div>
            <button className='btn btn-light' onClick={handelsort}> {sort}</button>
           <button className='btn btn-transparent'  onClick={handelunsort}> {xxx}</button>
           </div>
      </div>
  
      {data.loading && <div>Loading...</div>}
      {!data.loading && data.error ? <div>Error: {data.error}</div> : null}
      {!data.loading && data.products.length ? (
        <ul>
          {data.products.map((item)=>{
            return <SingleProduct item = {item} key ={item.id} />
          })}
        </ul>
      ) : null}
      
    </div>
    
  )
}
export default Products;






// {!data.loading && data.products.length ? (
        
//   <ul>
//     {data.products.map(i => (
//       <div key={i.id} className="items"> 
//       <>{!edit?(<h3>{i.title}</h3>):<input value={i.title} onChange={(e)=>Setnewtitle(e.target.value)}/>}</>  
//      <> <img src={i.image} alt={i.title} /> </> 
//      <div>
//       <>{!edit?(<>Price: {i.price} $</>):<input value={i.price} onChange={(e)=>Setnewprice(e.target.value)}/>}</>
//       <>{!edit?(<p>Rating :{i.rating}</p>):<input value={i.rating} onChange={(e)=>Setnewrating(e.target.value)}/>}</>
//       <Link to={`/details/${i.id}`}> Details </Link>
//          <>{!edit?(<><button 
//           className='btn btn-primary'
//           onClick={()=>Setedit(true)}
//           > Edit </button>
          
//           <button 
//           className='btn btn-danger '
//           onClick={()=>handeldelete(i.id)}
//           >Delete</button></>):
//           <>
//           <button 
//           className='btn btn-sucess'
//           onClick={()=>handelupdate(i.id,{values})}
//           > Save </button>
          
//           <button 
//           className='btn btn-warning'
//           onClick={()=>Setedit(false)}
//           > Cancel </button></>}</> 
//           </div></div>
//     ))}
//   </ul>
  
// ) : null}












// state.products = state.products.filter(item => item.id !== action.payload.id);