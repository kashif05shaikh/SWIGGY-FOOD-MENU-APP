import { createContext } from "react";

const UserContext=createContext({
    loggedinUser:"DEFAULT USER",
})
export default UserContext;