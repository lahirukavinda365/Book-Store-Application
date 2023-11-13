import React, { useState, useEffect } from 'react'
import BackButton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnack } = useSnackbar();
  const {id} = useParams();
  
  useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:8000/books/${id}`)
      .then((result) => {
        setAuthor(result.data.author);
        setPublishedYear(result.data.publishedYear);
        setTitle(result.data.title); 
        setLoading(false); 

      }).catch((err) => {
        setLoading(false);
        alert('an Error Happened...');
        console.log(err);
      });

  }, []);
  const handleEditBook = () => {
      const data = {
        title,
        author,
        publishedYear
      };

      setLoading(true);

      axios.put(`http://localhost:8000/books/${id}`, data)
      .then((res) => {
        setLoading(false);
        enqueueSnack('Book Edited Successfully...', { variant:'success'})
        navigate('/')
      }).catch((err) => {
        setLoading(false);
        enqueueSnack('Error...', { variant:'error'})
       // alert('an Error Happened...');
        console.log(err);
      });
  }

  return (
    <div className='p-4'>
        <BackButton />

        <h1 className="text-3xl my-4">Edit Book</h1>
        {
          loading ? <Spinner /> : ''
        }

        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-50 px-4 py-2 w-full' />
          </div>
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-50 px-4 py-2 w-full' />
          </div>
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={publishedYear} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-50 px-4 py-2 w-full' />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
        </div>
    </div>
  )
}

export default EditBook