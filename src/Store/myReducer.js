import {v4 as uuid} from "uuid";



const initialState = {
  users: [
      {
          id: "1",
          name: "Company Name",
          email: "Real Estate",
          contact: "Lagos",
          relation:"Dec 12, 2016"
      },   
      {
        id: "2",
        name: "Company Name",
        email: "Local Bussiness",
        contact: "Accra",
        relation:"Dec 13, 2016"
    },  
    {
      id: "3",
      name: "Company Name",
      email: "Speciality Foood",
      contact: "Texas",
      relation:"Dec 13, 2016"
  },   
  {
    id: "4",
    name: "Company Name",
    email: "E-commerce",
    contact: "Nirobi",
    relation:"Dec 14, 2016"
},    
  ]
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
      case "ADD_USER":
          const newUser = {
              id: uuid(),
              name: action.payload.name,
              email: action.payload.email,
              contact: action.payload.contact,
              relation: action.payload.relation
          };
          return { ...state, users: [...state.users, newUser] };
          case "DELETE_USER":
              const filteredUsers = state.users.filter(user => user.id != action.payload);
              return  {...state, users: filteredUsers}
              case "EDIT_USER":
              const editedUsers = state.users.map(user => {
                if (user.id === action.user_id) {
                  return{...user, ...action.updated_info}
                }
                else{
                  return user;
                }
              });
              return{...state, users: editedUsers}
        default:
            return state;
    }

}

export default usersReducer;