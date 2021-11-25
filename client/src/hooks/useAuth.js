import { authContext } from "../App";
import { useContext } from "react";

export default function useAuth() {
    return useContext(authContext);
}