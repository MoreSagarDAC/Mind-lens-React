import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { Card, CardHeader, CardActions } from '@mui/material';
import { updateQuestion } from './services/questionService';

export default function EditQuestion() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [iconName, setIconName] = useState('');

    const backToDashboard = () => {
        navigate('/main');
    }

    useEffect(() => {
        if (location.state && location.state.question) {
            const { question } = location.state;
            setSelectedCategory(question.selectedCategory);
            setQuestionText(question.questionText);
            setOption1(question.option1);
            setOption2(question.option2);
            setOption3(question.option3);
            setOption4(question.option4);
            setIconName(question.iconPath);
        }
    }, [location.state]);

    const resetForm = () => {
        setSelectedCategory('');
        setQuestionText('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setIconName('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newQuestionData = {
            selectedCategory,
            questionText,
            option1,
            option2,
            option3,
            option4,
            iconPath: `../Assets/${iconName}`
        };

        try {
            const updatedQuestion = { ...location.state.question, ...newQuestionData };
            const response = await updateQuestion(updatedQuestion);
            console.log("Updated question added:", response.data);
            alert('Updated Question is Added!!');
            resetForm();
        } catch (error) {
            console.log("Error Updating new question:", error.message);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIconName(file.name);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
            <Card style={{ width: '450px', height: '450px', boxShadow: '0px 0px 2px 0.3px rgba(0,0,0,0.3)' }}>
                <CardHeader title="Edit Question" style={{ backgroundColor: 'rgb(199, 196, 196)' }} />
                <CardContent style={{ margin: '5px' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Question Text"
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Option 1"
                                        value={option1}
                                        onChange={(e) => setOption1(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Option 2"
                                        value={option2}
                                        onChange={(e) => setOption2(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Option 3"
                                        value={option3}
                                        onChange={(e) => setOption3(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Option 4"
                                        value={option4}
                                        onChange={(e) => setOption4(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Select Icon Path</InputLabel>
                                <FormControl fullWidth>
                                    <input type="file" onChange={handleFileChange} style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '4px' }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '150px' }}>Update</Button>
                                    <Button variant="contained" color="primary" onClick={backToDashboard}>Back to Dashboard</Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
