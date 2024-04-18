import axios from 'axios'
const url='http://localhost:3000/category';



export const addNewCategory=async(data)=>{
    try {
        return await axios.post(url,data);
    } catch (error) {
        console.log("error : ",error.message);
    }
}

export const getAllCategory=async()=>{
    try {
        return await axios.get(url);
    } catch (error) {
        console.log("error : ",error.message);
    }
}