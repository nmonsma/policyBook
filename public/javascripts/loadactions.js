//Constants and Variables
let policyTable = [];

//Fetch Requests
//Get JSON from database
const loadPolicyTable = async ()=> {
    const request = await fetch('/allPolicies'); //This get route returns the entire Policy Table.
    try {
        const policyTable = await request.json();
        console.log(policyTable);

        for (let selectedPolicyIndex=0; selectedPolicyIndex<policyTable.length; selectedPolicyIndex++) {
            console.log (`Policy: ${selectedPolicyIndex}`);
        
            //Create Policy Div
            const createdDiv = document.createElement('div');
            
            //Create and Add Policy Header with #### Title Audience
            const headingParagraph = document.createElement('p');
            
                //Add policy number
                const numberSpan = document.createElement('span');
                numberSpan.innerText = `${policyTable[selectedPolicyIndex].policy_number}`;
                numberSpan.classList.add('policy-number');
                headingParagraph.appendChild(numberSpan);
                
                //Add policy title
                const titleSpan = document.createElement('span');
                titleSpan.innerText = `${policyTable[selectedPolicyIndex].title}`;
                titleSpan.classList.add('policy-title');
                headingParagraph.appendChild(titleSpan);
                
                //Add audiences
                const audienceSpan = document.createElement('span');
                audienceSpan.innerText = `${policyTable[selectedPolicyIndex].audiences}`;
                audienceSpan.classList.add('policy-audience');
                headingParagraph.appendChild(audienceSpan);
        
            headingParagraph.classList.add('heading');
        
            createdDiv.appendChild(headingParagraph);
        
            //Create and Add Policy Content
            const contentParagraph = document.createElement('p');
            contentParagraph.innerText = `${policyTable[selectedPolicyIndex].content}`;
            contentParagraph.classList.add('content');
            createdDiv.appendChild(contentParagraph);
        
            //Create and Add Footer with Adopted ####-##-## by *
            const footerParagraph = document.createElement('p');
            footerParagraph.innerText = `${policyTable[selectedPolicyIndex].status} on ${policyTable[selectedPolicyIndex].date} by ${policyTable[selectedPolicyIndex].entity}`;
            footerParagraph.classList.add('approval');
            createdDiv.appendChild(footerParagraph);
        
            //Add Div to main
            main.appendChild(createdDiv); 

            createdDiv.classList.add('policy', `status-${policyTable[selectedPolicyIndex].status}`);
        }


    }catch(error){
        console.log("error", error);
    }

    
}

// Sample Result:
// [
//    {
//         "policy_id": 46,
//         "policy_number": 2032,
//         "title": "Admission Procedures",
//         "section_number": 2000,
//         "content": "Upon completion of the application, a home visit with the family will be arranged with an EPCS Board of Trustees representative and a member of the administration. The admissions process may include interviewing, testing, evaluating past school records. Enrollment and placement information relevant to making a wise decision is shared with appropriate members of the community. Recommendations may be sought from other community members and/or friends of EPCS. Non-disclosure of essential information could result in the withdrawal of an acceptance. The board member will make an admissions recommendation of the family to the EPCS Board for final approval. All new students are on probation for the first ten weeks.",
//         "status": "approved",
//         "entity": "Board",
//         "date": "2024-10-08 00:00:00",
//         "audiences": "F"
//     },
//     {
//         "policy_id": 47,
//         "policy_number": 2033,
//         "title": "Admission Requirements for the Parents",
//         "section_number": 2000,
//         "content": "At its heart, EPCS is a Christian institution whose goals are the nurturing and instruction of children from Christian families. We teach the Lordship of Jesus Christ in all the curricular subjects and in all our school's activities. The school is seen as an extension of the Christian home, a place where the values and beliefs which the parents teach are further developed and enhanced. Therefore, those families seeking admission to the school must share the school's goals for their child. At least one parent or legal guardian must be an active member of a Christian church and profess faith in Jesus Christ as Lord and Savior. The parents should be willing to cooperate with all the written policies of East Palmyra Christian School. This is most important in the area of discipline and schoolwork standards, as well as active communication with the respective teacher(s) and administration.",
//         "status": "approved",
//         "entity": "Board",
//         "date": "2024-10-08 00:00:00",
//         "audiences": "F"
//     },
//     {
//         "policy_id": 48,
//         "policy_number": 2040,
//         "title": "Spiritual Qualifications",
//         "section_number": 2000,
//         "content": "All candidates for employment must have:\n-Whole-hearted agreement with the East Palmyra Christian School Statement of Faith.\n-From all accounts and appearances, clear evidence of a personal commitment to the Lord Jesus Christ.\n-Not a recent convert (less than two years).\n-An obvious working knowledge of and adherence to the Scriptures, especially in regard to families, marriage, children, and authority found in passages such as Gen. 2:18-25, Matt. 6:31,32, Eph. 6:1-4, Heb. 13:4.",
//         "status": "approved",
//         "entity": "Board",
//         "date": "2024-10-08 00:00:00",
//         "audiences": "S"
//     }
// ]

//Get Major Dom Element
const main = document.getElementById('main');
    

//Main Actions
//Update policyTable
loadPolicyTable();
//Iterate through rows

