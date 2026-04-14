//Constants and Variables

//Fetch Requests
//Load Policy Table
const loadPolicyTable = async (route)=> {
    //Start the Loading Animation
    document.getElementById('loading-container').classList.remove('hidden');

    //Get the main element
    const main = document.getElementById('main');
    //Get the sidebar element
    const sidebar = document.getElementById('sidebar');

    //Clear Policy Table and Sidebar
    main.textContent = '';
    sidebar.textContent = '';
    //Reset current area and section
    let currentAreaDiv = {};
    let currentSectionDiv = {};
    try {
        /*Online Routes*/
        const request = await fetch(route); //Get the table json from the specified route.
        const policyTable = await request.json(); //Convert the response to JSON
        const request2 = await fetch('headings'); //Get the headings json from the specified route.
        const headings = await request2.json(); //Convert the response to JSON

        //End the Loading Animation
        document.getElementById('loading-container').classList.add('hidden');

        for (let selectedPolicyIndex=0; selectedPolicyIndex<policyTable.length; selectedPolicyIndex++) {
            
        //New Area
            //If the policy in a new area, add an area header and add to the TOC sidebar
            if(Math.floor(policyTable[selectedPolicyIndex].section_number/1000) != currentAreaDiv.id) {
                currentArea = Math.floor(policyTable[selectedPolicyIndex].section_number/1000);
                
                //Get the area title from the headings table
                let areaTitle = '';
                try {
                    areaTitle = headings.find(({ heading_number }) => heading_number === currentArea).heading_title;
                } catch (error) {
                    console.log("error", error);
                    areaTitle = "[Title Not Found]";
                }

                //Create Area Div
                const createdAreaDiv = document.createElement('div');
                createdAreaDiv.classList.add('divider');
                createdAreaDiv.id = `${currentArea}`;
                
                    //Create Header
                    const createdHeader = document.createElement('h2');

                        //Add content from policyTable:
                        const createdNumberSpan = document.createElement('span');
                        const createdTitleSpan = document.createElement('span');
                        createdNumberSpan.innerText = `${currentArea}`;
                        createdNumberSpan.classList.add('policy-number');
                        
                        createdTitleSpan.innerText = `${areaTitle}`;          
                        
                        createdHeader.appendChild(createdNumberSpan);
                        createdHeader.appendChild(createdTitleSpan);      
                        createdHeader.classList.add('sticky', 'area-title');
                    
                    createdAreaDiv.appendChild(createdHeader);

                //Set as current area and append to main
                currentAreaDiv = createdAreaDiv;
                main.appendChild(createdAreaDiv);

                //Add to the sidebar
                const createdSidebarP = document.createElement('p');
                createdSidebarP.innerHTML = `<a href="#${createdNumberSpan.innerText}">${createdNumberSpan.innerText} ${createdTitleSpan.innerText}`;
                createdSidebarP.classList.add('sidebar-item');
                sidebar.appendChild(createdSidebarP); //Add to the sidebar                

            }


        //New Section
            //If new section, add section header and add to the TOC sidebar
            if(policyTable[selectedPolicyIndex].section_number != currentSectionDiv.id) {
                currentSection = policyTable[selectedPolicyIndex].section_number;
                
                //Get the section title from the headings table
                let sectionTitle = '';
                try {
                    sectionTitle = headings.find(({ heading_number }) => heading_number === currentSection).heading_title;
                } catch (error) {
                    console.log("error", error);
                    sectionTitle = "[Title Not Found]";
                }               

                //Create Area Div
                const createdSectionDiv = document.createElement('div');
                createdSectionDiv.classList.add('section-divider');
                createdSectionDiv.id = `${currentSection}`;

                    //Create Section Header
                    const createdSectionHeader = document.createElement('h3');
    
                        //Add content from policyTable
                        const createdNumberSpan = document.createElement('span');
                        const createdTitleSpan = document.createElement('span');
                        createdNumberSpan.innerText = `${currentSection}`;
                        createdNumberSpan.classList.add('policy-number');

                        createdTitleSpan.innerText = `${sectionTitle}`;
                        
                        createdSectionHeader.appendChild(createdNumberSpan);
                        createdSectionHeader.appendChild(createdTitleSpan);      
            
                        createdSectionHeader.classList.add('divider', 'section-title');
                        createdSectionDiv.appendChild(createdSectionHeader);
              
               //Set as current section and append to current area
               currentSectionDiv = createdSectionDiv;
               currentAreaDiv.appendChild(createdSectionDiv);

                //Add to the sidebar
                const createdSidebarP = document.createElement('p');
                createdSidebarP.innerHTML = `<a href="#${createdNumberSpan.innerText}">${createdNumberSpan.innerText} ${createdTitleSpan.innerText}`;
                createdSidebarP.classList.add('sidebar-item');
                createdSidebarP.classList.add('section-toc-entry');
                sidebar.appendChild(createdSidebarP); //Add to the sidebar                



            }

        //Add Policy
            //Create Policy Div
            const createdDiv = document.createElement('div');
            createdDiv.id = `${policyTable[selectedPolicyIndex].policy_number}`;

            //Isolate policy id
            const policyId = policyTable[selectedPolicyIndex].policy_id;
            
            //Create and Add Policy Header with #### Title handbook
            const headingParagraph = document.createElement('h4');

                //Add policy title -- This is added first, even though it is displayed second, so that copying and pasting into Word puts the title first.
                const titleSpan = document.createElement('span');
                titleSpan.innerText = `${policyTable[selectedPolicyIndex].title}\u2002`;
                titleSpan.classList.add('policy-title');
                titleSpan.id=(`${policyId}-policy-title`);
                headingParagraph.appendChild(titleSpan);

                //Add policy number
                const numberSpan = document.createElement('span');
                numberSpan.innerText = `${policyTable[selectedPolicyIndex].policy_number}\u2003`;
                numberSpan.classList.add('policy-number');
                numberSpan.id=(`${policyId}-policy-number`);
                headingParagraph.appendChild(numberSpan);
                
                
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
                    handbookX.classList.add('handbook-x')
                    handbookSpan.appendChild(handbookX);
                }

                handbookSpan.classList.add('policy-handbook');
                handbookSpan.id=(`${policyId}-handbooks`);
                headingParagraph.appendChild(handbookSpan);
        
            headingParagraph.classList.add('heading', 'sticky');
            headingParagraph.id=(`${policyId}-policy-heading`);
            createdDiv.appendChild(headingParagraph);
        
            //Create and Add Policy Paragraph Content
            const contentParagraph = document.createElement('p');
            
            //Add content from policyTable as innerText or innerHTML depending on the HTML_content flag
            if (policyTable[selectedPolicyIndex].HTML_content) {            
                contentParagraph.innerHTML = `${policyTable[selectedPolicyIndex].content}`}
            else {contentParagraph.innerText = `${policyTable[selectedPolicyIndex].content}`;}
                
            //If there is an image URL, add that image
                if(policyTable[selectedPolicyIndex].image_url!=null) {contentParagraph.innerHTML += `<img src="${policyTable[selectedPolicyIndex].image_url}" class="policy-image"/>`;}
            contentParagraph.classList.add('content');
            contentParagraph.id=(`${policyId}-content`);
            createdDiv.appendChild(contentParagraph);
        
            //Create and Add Footer with Adopted ####-##-## by *
            const footerParagraph = document.createElement('p');
            footerParagraph.innerText = `${policyTable[selectedPolicyIndex].status} on ${policyTable[selectedPolicyIndex].date} by ${policyTable[selectedPolicyIndex].entity}`;
            footerParagraph.classList.add('approval');
            footerParagraph.id=(`${policyId}-approval`);
            createdDiv.appendChild(footerParagraph);
        
            //Add Div to main
            currentSectionDiv.appendChild(createdDiv); 

            createdDiv.classList.add('policy', `status-${policyTable[selectedPolicyIndex].status}`);

            //Add classes to board policies
            try {
                if(policyTable[selectedPolicyIndex].entity.toLowerCase() == 'board' || policyTable[selectedPolicyIndex].entity.toLowerCase() == 'society') {
                createdDiv.classList.add('board-policy');
            }} catch (error) {
                console.log("error", error);
            }
        }


    }catch(error){
        console.log("error", error);
    }

    
}

//Update policyTable
loadPolicyTable('all_policies?filter=all');
//Iterate through rows

