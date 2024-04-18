import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { getAllCategory } from './services/categoryService';
import { getALLQuestion, deleteQuestion } from './services/questionService';
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
export default function DisplayForm() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getALLQuestion();

      setQuestions(response.data);
      console.log('All question Available', response);

    } catch (error) {
      console.log("Error fetching questions:", error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      if (Array.isArray(response.data)) {
        setCategories(response.data);
        console.log('Main page display categories:', response);
      } else {
        console.error("Error fetching categories: response.data is not an array");
      }
    } catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  };

  const deleteQuestionById = async (id) => {
    try {
       await deleteQuestion(id);
        alert('Question is deleted!!');
        fetchQuestions();
    } catch (error) {
      console.log("Error fetching questions:", error.message);
    }
  }

  // const handleOptionClick = (option) => {
  //   setSelectedOption(prevOption => prevOption === option ? null : option);
  // };
  const handleOptionClick = (questionId, option) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question.id === questionId ? { ...question, selectedOption: option } : question
      )
    );
  };

  const EditQuestion = (question) => {
    setSelectedQuestion(question);
    const { id } = question;
    navigate(`/main/editQuestion/${id}`, { state: { question } });
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: '0px 50px 50px 50px' }}>
      <h2>All Categories</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {categories.map((category, index) => (
          <li key={index}>
            <Button style={{ textDecoration: 'none' }}>{category.category_name}</Button>
            <Card style={{ boxShadow: '0px 0px 1px 0.3px rgba(0,0,0,0.2)' }}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {questions.filter(question => question.selectedCategory === category.category_name)
                        .map((question, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ width: '20%' }}>
                              <img src={`/` + question.iconPath} style={{ width: '35px', height: '35px' }} />
                            </TableCell>
                            <TableCell style={{ width: '20%' }}>{question.questionText}</TableCell>
                            <TableCell style={{ width: '60%' }}>
                              <ButtonGroup>
                                {[
                                  question.option1,
                                  question.option2,
                                  question.option3,
                                  question.option4
                                ].map((option, idx) => (
                                  <Button
                                    key={idx}
                                    style={{ textAlign: 'start' ,width: '160px'}}
                                    variant={question.selectedOption === option ? "contained" : "outlined"}
                                    onClick={() => handleOptionClick(question.id, option)}
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </ButtonGroup>
                            </TableCell>
                            <TableCell style={{ width: '20%' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>

                                <EditIcon style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }} onClick={() => EditQuestion(question)}/>
                                <DeleteIcon style={{ color: 'red', marginLeft: '20px', cursor: 'pointer' }} onClick={() => deleteQuestionById(question.id)}/>
                              </div> 
                              </TableCell>

                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
