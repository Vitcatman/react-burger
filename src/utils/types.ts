import { Location } from "history";

export type TLocation = {
  background?: Location<TLocation>;
  from?: { pathname: string };
};

export type TFeed = {
  readonly number: number;
  readonly name: string;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: Object[];
  readonly _id: string;
  readonly data: {
    readonly ingredients: Object[];
    readonly number: number;
  };
};

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  readonly id: string;
  count?: number;
  index?: number;
};

export type TUserData = {
  name: string;
  email: string;
  password: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type TPasswordReset = {
  password: string;
  token: string;
};
