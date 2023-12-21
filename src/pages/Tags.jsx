import React from 'react';
import {  useSelector } from 'react-redux';
import {useParams} from "react-router-dom"
import Grid from '@mui/material/Grid';
import axios from "../axios";
import { Post } from '../components/Post';




export const Tags = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const userData = useSelector((state)=>state.auth.data)
  const {posts, tags} = useSelector(state=>state.posts);

  const {tag} = useParams();

  React.useEffect(()=>{
    axios.get(`/tags/${tag}`).then(res =>{
      setData(res.data);
      console.log(data)
      setLoading(false);
    }).catch((err)=>{
      console.warn(err);
      alert('Error with get post');
    })
  }, [])
  return (
    <>
      
      <h1>#{tag}</h1>
     
        
      <Grid xs={8} item>
          {(isLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ?`http://localhost:4444${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              
              isEditable ={userData?._id === obj.user._id}
            />
            ),
          )}
        </Grid>
        
     
    </>
  );
};
