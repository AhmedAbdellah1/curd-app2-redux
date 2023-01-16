import React, { useState } from 'react'
import { addPost, deletePost, updatePost } from '../redux/PostsSlice';
import { useSelector, useDispatch } from 'react-redux';

const Posts = () => {

    //this state to hold data from input
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //this state to hold data from input
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");

    //this is flage
    const [isEdit, setIsEitle] = useState(false);

    //this to knawo post what hea whant to edit
    const [idPost, setIdPost] = useState();


    //this to use data from PostsSlice to my componenet App
    //this  {state.posts} mean tha reducer posts in store   
    const myPosts = useSelector((state) => state.posts.postsItem);

    // this to send action or to triggar action
    const dispatch = useDispatch();

    
    return (
        <>
            <form className='form'
                onSubmit={(e) => {
                    dispatch(addPost({ id: myPosts.length + 1, title, description }))
                    setTitle('');
                    setDescription('');
                    e.preventDefault();
                }}>

                <input
                    type='trxt'
                    value={title}
                    placeholder='Enter Post Title'
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type='trxt'
                    value={description}
                    placeholder='Enter Post Desc'
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button>Add Post</button>

            </form>

            <div className='posts'>

                {myPosts.length > 0 ?

                    myPosts.map(post =>

                        <div className='post' key={post.id}>

                            <h2>{post.title}</h2>
                            <p>{post.description}</p>

                            <button onClick={() => { setIsEitle(true); setIdPost(post.id); }}>Edit</button>

                            <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>

                            <br />
                            {/* hear whan click button Edit */}
                            {isEdit && idPost === post.id && (

                                <form className='form'
                                    onSubmit={(e) => {
                                        dispatch(updatePost({ id: post.id, title: updateTitle, description: updateDescription }))
                                        setUpdateTitle('');
                                        setUpdateDescription('');
                                        setIsEitle(false)
                                        e.preventDefault();
                                    }}>
                                    <input type='text' placeholder='Updated Title'
                                        onChange={(e) => setUpdateTitle(e.target.value)}
                                        value={updateTitle}
                                    />
                                    <input type='text' placeholder='Updated Desc'
                                        onChange={(e) => setUpdateDescription(e.target.value)}
                                        value={updateDescription}
                                    />
                                    <button>Update</button>
                                </form>

                            )}
                        </div>
                    ) : 'Theer is No Posts'
                }

            </div>
        </>
    )
}

export default Posts
