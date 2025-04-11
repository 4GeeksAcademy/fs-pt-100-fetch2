import React, { useEffect, useState } from "react";


export const Posts = (props) => {
    const [postInfo, setPostInfo] = useState(props);
    const [isEditing, setIsEditing] = useState(false);
    const [bg, setBg] = useState();


    useEffect(()=>{
        console.log('valor de is editing --> ', isEditing);
        if (isEditing) return setBg('bg-success');
        setBg('');
    },[isEditing])
   
    useEffect(()=>{
        console.log('info cargada');
    },[postInfo])

    const handleChange = e => {
        setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
    }

    const handleClick = () => {
        setIsEditing(!isEditing);
    }

    const handleEdit = async (id) => {
        try {
            const payload = { ...postInfo };
            delete payload.pid;
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!resp.ok) throw new Error('error updating ' + id);
            const data = await resp.json();
            setIsEditing(!isEditing);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async id => {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
                method: "DELETE",
            });
            if (!resp.ok) throw new Error('error updating ' + id);
            console.log('eliminado ' + id);
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className={`container border border-2 ${bg}`} >
            <input type="text" value={postInfo.title}
                name="title"
                onChange={handleChange}
                readOnly={!isEditing}
            />

            <div className="border border-2">
                <textarea name="body" value={postInfo.body} onChange={handleChange}></textarea>
            </div>
            <button onClick={handleClick}>edit</button>
            {isEditing &&
                <button className="btn btn-primary" onClick={() => handleEdit(props.pid)}>save</button>
            }
            <button className="btn btn-danger" onClick={() => handleDelete(props.pid)}>X</button>
        </div>
    )
}