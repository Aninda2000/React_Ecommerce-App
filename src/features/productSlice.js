import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//declaring my initialstate
const initialState = {
  loading: false,
  products: [],
  error: "",
  product: {
    title: "",
    image: "",
    description: "",
    price: "",
  },
};

// for fetching products trying axios here
export const fetchproducts = createAsyncThunk("product/fetchproducts", () => {
  return axios
    .get(`https://my-json-server.typicode.com/karanfulare/products/products`)
    .then((resp) => resp.data);
});

// adding products to my list POST request
export const addproducts = createAsyncThunk(
  "product/addproducts",
  async ({ values }) => {
    return fetch(
      `https://my-json-server.typicode.com/karanfulare/products/products`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          price: values.price,
          image: values.image,
        }),
      }
    ).then((resp) => resp.json());
  }
);

// deleting products from my list DELETE request
export const deleteproduct = createAsyncThunk(
  "products/deleteproduct",
  async (id) => {
    return fetch(
      `https://my-json-server.typicode.com/karanfulare/products/products/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log("data", data);
        return { id: id };
      })
      .catch((err) => {
        console.log("error");
      });
  }
);

// updating products from my list PUT request
export const updateproduct = createAsyncThunk(
  "product/updateproduct",
  async ({ id, item: values }) => {
    return fetch(
      `https://my-json-server.typicode.com/karanfulare/products/products/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          price: values.price,
          rating: values.rating,
          image: values.image,
        }),
      }
    ).then((res) => res.json());
  }
);

// my reducers
const productSlice = createSlice({
  name: "myproduct",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      // for details page
      state.product = state.products.find((el) => el.id === action.payload);
    },
    sortAction: (state, action) => {
      let sorted = state.products.sort(function (item1, item2) {
        if (item1.price < item2.price) return -1;
        if (item1.price > item2.price) return 1;
        return 0;
      });
      state.products = sorted;
    },
    unsortAction: (state, action) => {
      state.products = state.products.sort(function (item1, item2) {
        if (item1.id < item2.id) return -1;
        if (item1.id > item2.id) return 1;
        return 0;
      });
    },
  },
  // this extraReducer work on api req (onpending,onfulfilled,onreject)
  extraReducers: (builder) => {
    builder.addCase(fetchproducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchproducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(addproducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addproducts.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.id = state.products.length + 1;
      state.products = [...state.products, action.payload];
      state.error = "";
    });
    builder.addCase(addproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteproduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.error = "";
    });
    builder.addCase(deleteproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateproduct.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action", action);
      const item = action.payload;

      state.products = state.products.map((product, index) => {
        if (product.id === item.id) {
          return item;
        }
        return product;
      });
    });
    builder.addCase(updateproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { getProduct } = productSlice.actions;
export const { sortAction } = productSlice.actions;
export const { unsortAction } = productSlice.actions;
export default productSlice.reducer;
