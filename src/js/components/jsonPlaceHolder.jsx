import React, { useEffect, useState } from "react";
import { Posts } from "./posts.jsx";
import { NewPost } from "./newPost.jsx";

export const JSONPlaceHolder = () => {

    const [posts, setPosts] = useState();


    useEffect(() => {
        //aqui pedido
        //loadPostsPromesas()
        loadPostsAsync()
    }, [])


    const loadPostsPromesas = () => {
        fetch('https://jsonplaceholder.typicode.com/posts') //genera una promesa
            .then(resp => {
                if (!resp.ok) throw new Error('error fetching')
                return resp.json()
            })
            .then(data => setPosts(data))
            .catch(err => console.log(err)) // fetch por promesas
    }


    const loadPostsAsync = async () => {
        try {
            const resp =  await fetch('https://jsonplaceholder.typicode.com/posts'); //genara una promesa
            console.log('resp sin await',resp);    
            if (!resp.ok) throw new Error('error fetching posts');
            const data = await resp.json();
            setPosts(data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <NewPost/>
            {
                posts?.map(el => <Posts key={el.id} pid={el.id} title={el.title} body={el.body} />)
            }
        </div>
    )
}