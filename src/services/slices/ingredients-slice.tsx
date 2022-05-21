import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/data";
import { checkResponse } from "../../utils/check-response";
import {getCookie} from "../../utils/cookies"

const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
  ingredientDetails: null,
  ingredientModalState: false,
  ingredientsConstructor: [],
  orderNumber: 0,
  orderName: "", 
  cartModalState: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    showIngredientModal: (state, action) => {
      state.ingredientDetails = action.payload;
      state.ingredientModalState = true;
    },
    hideIngredientModal: (state) => {
      state.ingredientDetails = null;
      state.ingredientModalState = false;
    },
    addIngredient: {
      // @ts-ignore
      reducer: 
      (state, { payload }) => {
        state.ingredientsConstructor.push(payload);
      },
      // @ts-ignore
      prepare: (item) => {
        const id = nanoid();
        // @ts-ignore
        return { payload: { id, ...item } };
      },
    },
    dragIngredients: (state, { payload }) => {
      const ingredientsToCart = state.ingredientsConstructor.filter(
        (i) => i.type !== "bun"
      );
      ingredientsToCart[payload.drag] = ingredientsToCart.splice(
        payload.hover,
        1,
        ingredientsToCart[payload.drag]
      )[0];
      state.ingredientsConstructor = ingredientsToCart.concat(
        state.ingredientsConstructor.filter((i) => i.type === "bun")
      );
    },
    removeIngredient: (state, action) => {
      if (action.payload.type === "bun")
        state.ingredientsConstructor = state.ingredientsConstructor.filter(
          (i) => i.type !== "bun"
        );
      else {
        state.ingredientsConstructor = state.ingredientsConstructor.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    closeOrderModal: (state) => {
      state.cartModalState = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.ingredients = action.payload.data;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Проблема с загрузкой данных`;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.orderNumber = 0;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.ingredientsConstructor = [];
        state.orderNumber = action.payload.order.number;
        state.orderName = action.payload.name;
        state.cartModalState = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isLoading = false;
        // @ts-ignore
        state.error = `Ошибка отправки заказа`;
      })
      .addDefaultCase(() => {});
  },
});

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const res = await fetch(`${baseUrl}/ingredients`);
      const newData = await checkResponse(res);
      return newData;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "ingredients/fetchOrder",
  async (ingredientsConstructor, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        authorization: getCookie("accessToken") },
        body: JSON.stringify({
          // @ts-ignore
          ingredients: ingredientsConstructor.map((el) => el._id)
        }),
      });
      const newData = await checkResponse(res);
      return newData;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const ingredientsSelector = (state) => state.ingredients;

export const ingredientsReducer = ingredientsSlice.reducer;

export const {
  showIngredientModal,
  hideIngredientModal,
  addIngredient,
  dragIngredients,
  removeOrderModal,
  removeIngredient,
  closeOrderModal,
} = ingredientsSlice.actions;
