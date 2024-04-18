import React, { useState } from 'react'
import { FormGroup, FormControl, InputLabel } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './Category.css'
import { addNewCategory,  } from './services/categoryService';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  category_name: '',
}
export default function Add_Category() {
  const [category, setCategory] = useState(initialValue)
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/main');
  };

  const onChangeValue = (e) => {
    setCategory({ ...category, category_name: e.target.value });
    console.log(e.target.value);

  }

  const addCategory = async () => {
    await addNewCategory(category);
    console.log('category', category)
    alert("Category Added Successfully!!!")
  }


  return (
    <div className='card-div'>
      <Card className='card'>
        <CardHeader title="Add Category" className='card-header' />

        <CardContent className='card-content'>
          <FormGroup>
            <FormControl>

              <TextField label="Category Name" variant='outlined' onChange={onChangeValue} />

            </FormControl>
          </FormGroup>
          <CardActions className='card-button'>
            <Button variant="contained" onClick={addCategory}>Save</Button>
            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  )
}
