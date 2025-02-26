// Variables



//Functions
//Get JSON from database
const getPolicyTable = async ()=> {
    const request = await fetch('/allPolicies'); //This get route returns the entire Policy Table.
    try {
        const returnedData = await request.json();
        console.log(returnedData);
    }catch(error){
        console.log("error", error);
    }
}

