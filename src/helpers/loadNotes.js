import { collection, getDocs, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async(uid='') =>{

    try {
        

            const notesRef = collection(FirebaseDB, `${uid}/journal/notes`);
            const q = query(notesRef);
            const querySnapshot = await getDocs(q);
            const notes = [];
            querySnapshot.forEach((doc) => {
                notes.push({ id: doc.id, ...doc.data() });
            });

            return notes;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}