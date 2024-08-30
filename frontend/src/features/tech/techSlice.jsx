import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  tech: [],
};
export const techReducer = createSlice({
  name: "tech",
  initialState,
  reducers: {
    addTech: (state, action) => {
      const {
        _id,
        firstname,
        lastname,
        gender,
        phonenumber,
        deposit,
        email1,
        image,
        location,
      } = action.payload;
      const tech = {
        id: nanoid(),
        _id: _id,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phonenumber: phonenumber,
        deposit: deposit,
        email1: email1,
        image: image,
        location: location,
      };
      state.tech.push(tech);
    },
    removeTech: (state, action) => {
      state.tech = state.tech.filter((todo) => todo.id !== action.payload);
    },
    setTech: (state, action) => {
      const techs = action.payload.map((todo) => ({
        id: nanoid(),
        firstname: todo.firstname,
        lastname: todo.lastname,
        gender: todo.gender,
        phonenumber: todo.phonenumber,
        deposit: todo.deposit,
        email1: todo.email,
        image: todo.image,
        location: todo.location,
        _id: todo._id,
      }));
      state.tech = techs;
    },
    updateTech: (state, action) => {
      const {
        id,
        firstname,
        lastname,
        gender,
        phonenumber,
        deposit,
        email,
        image,
        location,
      } = action.payload;
      const existingTodo = state.tech.find((todo) => todo.id === id);
      if (existingTodo) {
        (existingTodo.firstname = firstname),
          (existingTodo.lastname = lastname),
          (existingTodo.gender = gender),
          (existingTodo.phonenumber = phonenumber),
          (existingTodo.deposit = deposit),
          (existingTodo.email = email),
          (existingTodo.image = image),
          (existingTodo.location = location);
      }
    },
  },
});
export const { addTech, removeTech, setTech, updateTech } = techReducer.actions;
export default techReducer.reducer;
