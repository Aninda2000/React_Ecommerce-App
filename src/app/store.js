import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import productSlice from "../features/productSlice";

const store = configureStore({
    reducer:{                         // old redux(combinereducer) combining our reducers here and passing it to store
        myproduct:productSlice,          
        cart:cartSlice
    }
})

export default store;

