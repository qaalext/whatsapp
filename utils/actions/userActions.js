import { child, endAt, get, getDatabase, orderByChild, query, ref, startAt } from "firebase/database"
import { getFireBaseApp } from "../fireBaseHelper";

export const getUserData = async (userId) => {
    try {
        const app = getFireBaseApp();
        const dbRef = ref(getDatabase());
        const userRef = child(dbRef, `users/${userId}`);
        const snapShot = await get(userRef);
        return snapShot.val();
    } catch (error) {
        console.log(error);
    }

}

export const searchUsers = async (queryText) => {
    const searchTerm = queryText.toLowerCase();
    try {
        const app = getFireBaseApp();
        const dbRef = ref(getDatabase());
    
        const userRef = child(dbRef, 'users');
        const queryRef = query(userRef, orderByChild('firstLast'), startAt(searchTerm), endAt(searchTerm + "\uf8ff"));

        const snapshot = await get(queryRef);

        if(snapshot.exists()) {
            return snapshot.val();
        }
        return {};
    } catch (error) {
        console.log(error);
        throw error;
    }
  
}