import { createSlice } from '@reduxjs/toolkit';
const postsSlice = createSlice({

    name: 'posts',

    initialState: {
        postsItem: []
    },

    reducers: {

        addPost: (state, action) => {
            if (action.payload.title !== "" && action.payload.description !== "") {
                state.postsItem.push(action.payload)
            }

        },

        deletePost: (state, action) => {

            /**
                 * this mean do you id 1 !== id 1 return false then removed 
                 * because function filter if return condtion felase will be removed 
                 * 
            */

            state.postsItem = state.postsItem.filter((post) => post.id !== action.payload)
        },

        updatePost: (state, action) => {
            state.postsItem.map((post) => {
                if (post.id === action.payload.id) {
                    if (action.payload.title !== "" && action.payload.description !== "") {
                        post.title = action.payload.title;
                        post.description = action.payload.description;
                    }
                }
            })
        },
    },
})
export const { addPost, deletePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;