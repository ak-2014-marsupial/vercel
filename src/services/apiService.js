import axios from "axios";
import {baseURL} from "../constants/urlsConstants";

const apiService=axios.create({baseURL});

export {
    apiService
}