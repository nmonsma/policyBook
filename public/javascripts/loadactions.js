//Constants and Variables
let policyTable = [];

//Fetch Requests
//Get JSON from database
const loadPolicyTable = async (route)=> {
    currentArea = 0;
    currentSection = 0;
    const request = await fetch(route); //Get the table json from the specified route.
    try {
        const policyTable = await request.json();
        console.log(policyTable);

        for (let selectedPolicyIndex=0; selectedPolicyIndex<policyTable.length; selectedPolicyIndex++) {
            //If the policy in a new area and/or new section, add an area and section header
            if(Math.floor(policyTable[selectedPolicyIndex].section_number/1000) != currentArea) {
                currentArea = Math.floor(policyTable[selectedPolicyIndex].section_number/1000);
                //Create Area Header
                const createdAreaDiv = document.createElement('div');
                //Add content from policyTable:
                const createdNumberSpan = document.createElement('span');
                const createdTitleSpan = document.createElement('span');
                createdNumberSpan.innerText = `${currentArea}`;
                createdNumberSpan.classList.add('policy-number');
                createdTitleSpan.innerText = `(area titles need to be looked up in separate db table)`;
                createdAreaDiv.appendChild(createdNumberSpan);
                createdAreaDiv.appendChild(createdTitleSpan);      
                createdAreaDiv.classList.add('divider', 'area-title');
                main.appendChild(createdAreaDiv);
              
            }

            if(policyTable[selectedPolicyIndex].section_number != currentSection) {
                currentSection = policyTable[selectedPolicyIndex].section_number;
                //Create Section Header
                const createdSectionDiv = document.createElement('div');
                //Add content from policyTable
                const createdNumberSpan = document.createElement('span');
                const createdTitleSpan = document.createElement('span');
                createdNumberSpan.innerText = `${currentSection}`;
                createdNumberSpan.classList.add('policy-number');
                createdTitleSpan.innerText = `(section titles need to be looked up in separate db table)`;
                createdSectionDiv.appendChild(createdNumberSpan);
                createdSectionDiv.appendChild(createdTitleSpan);      
    
                createdSectionDiv.classList.add('divider', 'section-title');
                main.appendChild(createdSectionDiv);
              
            }

            //Create Policy Div
            const createdDiv = document.createElement('div');
            createdDiv.id = `${policyTable[selectedPolicyIndex].policy_number}`;
            
            //Create and Add Policy Header with #### Title handbook
            const headingParagraph = document.createElement('h4');

                //Add policy number
                const numberSpan = document.createElement('span');
                numberSpan.innerText = `${policyTable[selectedPolicyIndex].policy_number}\u2003`;
                numberSpan.classList.add('policy-number');
                headingParagraph.appendChild(numberSpan);
                
                //Add policy title
                const titleSpan = document.createElement('span');
                titleSpan.innerText = `${policyTable[selectedPolicyIndex].title}\u2002`;
                titleSpan.classList.add('policy-title');
                headingParagraph.appendChild(titleSpan);
                
                //Add handbooks
                const handbookSpan = document.createElement('span');
                if (policyTable[selectedPolicyIndex].handbook_e) {
                    const handbookE = document.createElement('span');
                    handbookE.innerText = 'E';
                    handbookE.classList.add('handbook-e');
                    handbookSpan.appendChild(handbookE);
                }
                if (policyTable[selectedPolicyIndex].handbook_f) {
                    const handbookF = document.createElement('span');
                    handbookF.innerText = 'F';
                    handbookF.classList.add('handbook-f');
                    handbookSpan.appendChild(handbookF);
                }
                if (policyTable[selectedPolicyIndex].handbook_x) {
                    const handbookX = document.createElement('span');
                    handbookX.innerText = 'X';
                    handbookX.classList.add('handbook-x');
                    handbookSpan.appendChild(handbookX);
                }

                handbookSpan.classList.add('policy-handbook');
                headingParagraph.appendChild(handbookSpan);
        
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
            if(Math.floor(currentSection/1000)==currentSection/1000) {
                createdDiv.classList.add('board-policy');
            }
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
//         "handbooks": "F"
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
//         "handbooks": "F"
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
//         "handbooks": "S"
//     }
// ]

//Get Major Dom Element
const main = document.getElementById('main');
    

//Main Actions
//Update policyTable
loadPolicyTable('extracurricularPolicies');
//Iterate through rows

