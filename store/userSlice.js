import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        storedUsers: {}
      
    },
    reducers: {
        
        setStoredUsers: (state, action) => {
            const newsUsers = action.payload.newUsers;
            const existingUsers = state.storedUsers;

            const usersArray = Object.values(newsUsers);
        
            for (let i = 0; i < usersArray.length; i++) {
                const userData = usersArray[i];
                existingUsers[userData.userId] = userData;
            } 
            state.storedUsers = existingUsers;
        }
    }
});

export const setStoredUsers = userSlice.actions.setStoredUsers;
export default userSlice.reducer;