import { configureStore } from "@reduxjs/toolkit";
import techReducer from "../features/tech/techSlice";
import chatReducer from "../features/chat/chatSlice";
import adminReducer from "../features/admin/adminSlice";
export const store = configureStore({
  reducer: { tech: techReducer, chat: chatReducer, admin: adminReducer },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
