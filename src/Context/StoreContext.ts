import React, { createContext } from "react";
import { IStore } from "../Store/Store";

export interface StoreContext {
  Store: IStore;
}

//Контекст стора
export const StoreContext: React.Context<StoreContext> = createContext(
  {} as StoreContext,
);
