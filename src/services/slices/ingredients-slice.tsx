import { createSlice, createAsyncThunk, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/data";
import { checkResponse } from "../../utils/check-response";
import {getCookie} from "../../utils/cookies";
import { TIngredient, TFeed } from "../../utils/types";
import { TRootState } from "../index"

interface TInitialState {
  ingredients: TIngredient[],
  isLoading: boolean,
  hasError: boolean,
  ingredientDetails: null |  TIngredient[],
  ingredientModalState: boolean,
  ingredientsConstructor: TIngredient[],
  orderNumber: number,
  orderName: string, 
  cartModalState: boolean,
};

const initialState: TInitialState = {
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
      console.log(state.ingredientDetails)
    },
    hideIngredientModal: (state) => {
      state.ingredientDetails = null;
      state.ingredientModalState = false;
    },
    addIngredient: {
      reducer: 
      (state, { payload }: PayloadAction<TIngredient>) => {
        state.ingredientsConstructor.push(payload);
      },
      prepare: (item) => {
        const id = nanoid();
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
    removeIngredient: (state, { payload }) => {
      if (payload.type === "bun")
        state.ingredientsConstructor = state.ingredientsConstructor.filter(
          (i) => i.type !== "bun"
        );
      else {
        state.ingredientsConstructor = state.ingredientsConstructor.filter(
          (item) => item.id !== payload.id
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
  async (_, {rejectWithValue}) => {
    try {
      const res: Response = await fetch(`${baseUrl}/ingredients`);
      const newData = await checkResponse(res);
      return newData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "ingredients/fetchOrder",
  async (ingredientsConstructor: Array<TIngredient>, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        authorization: getCookie("accessToken") },
        body: JSON.stringify({
          ingredients: ingredientsConstructor.map((el) => el._id)
        }),
      });
      const newData = await checkResponse(res);
      return newData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const ingredientsSelector = (state: TRootState) => state.ingredients;

export const ingredientsReducer = ingredientsSlice.reducer;

export const {
  showIngredientModal,
  hideIngredientModal,
  addIngredient,
  dragIngredients,
  removeIngredient,
  closeOrderModal,
} = ingredientsSlice.actions;
