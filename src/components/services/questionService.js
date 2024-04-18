import axios from 'axios'
const Que_URL='http://localhost:3000/Question'
export const addNewQuestion=async(question)=>{
    try {
       return await axios.post(Que_URL,question);
    } catch (error) {
        console.log("Error :",error.message)
    }
}

export const getALLQuestion=async(question)=>{
    try {
       return await axios.get(Que_URL,question);
    } catch (error) {
        console.log("Error :",error.message)
    }
}

export const updateQuestion = async (question) => {
    try {
        const { id, ...updatedQuestionData } = question; 
        return await axios.put(`${Que_URL}/${id}`, updatedQuestionData);
    } catch (error) {
        console.log("Error:", error.message);
        throw error;
    }
};

export const deleteQuestion=async(id)=>{
    try {
        return await axios.delete(`http://localhost:3000/Question/${id}`);
     } catch (error) {
         console.log("Error :",error.message)
     }
}