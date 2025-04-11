import React, { useState } from "react";

export const NewPost = () => {

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: 99
    });
    const [error, setError] = useState();



    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (formData.title.trim().length == 0 || formData.body.trim().length == 0) throw new Error('no puede estar vacio')
            if (formData.title.trim().length < 3 || formData.body.trim().length < 5) throw new Error('tiene que tener mas caracteres')

            const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await resp.json();
            console.log(data);


        } catch (error) {
            setError(error.message);
        }
    }




    return (
        <form
            onSubmit={handleSubmit}
            className="form-control">
            <input
                className="form-control"
                placeholder="title"
                type="text" name="title"
                value={formData.title}
                onChange={handleChange} />
            <textarea
                placeholder="body"
                className="form-control"
                name="body"
                value={formData.body}
                onChange={handleChange} />
            <input
                className="btn btn-primary"
                type="submit"
                value="añadir" />
            {error && <p className="bg-danger p-2">{error}</p>}
        </form>
    )
}