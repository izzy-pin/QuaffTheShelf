import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../../firebase-config";


async function bookRecs(){
    const firestore = getFirestore(); //connects to database
    const bookISBN = "1505297400" //using a static ISBN currently, can be passed on props
    const bookRef = doc(firestore, `books/${bookISBN}`); //get the document
    const bookSnap = await getDoc(bookRef); // get document data
    const bookVotes = bookSnap.data().drinkPairings //drills to vote data

    let firstRec = "" 
    let secondRec = ""
    let userDrinkArray = []

    console.log(bookVotes)

    //create an object will all the drinks a user would drink
        //eg drinksObj {beer:0 , wine:0 , ale:0}

    //read though all the book pairing votes and incriment the values for each vote
        // eg drinksObj {beer:1 , wine:0 , ale:1}

    //return the top 2 of the object
        //eg firstRec="beer" secondRec="ale"

    //if theres not enough return random ones
      
            
    return {firstRec, secondRec, userDrinkArray}
}

export default bookRecs