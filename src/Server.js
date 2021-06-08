import axios from "axios";


const baseURL = axios.create({
    baseURL: "https://job-board-services2.herokuapp.com"
});


export default baseURL; 
