//Associate form options with classes
const formAssociations = [
    {"checkbox": "areas-checkbox",          "cssClass": "area-title"},
    {"checkbox": "sections-checkbox",       "cssClass": "section-title"},
    {"checkbox": "policy-numbers-checkbox", "cssClass": "policy-number"},
    {"checkbox": "handbooks-checkbox",      "cssClass": "policy-handbook"},
    {"checkbox": "content-checkbox",        "cssClass": "content"},
    {"checkbox": "approval-info-checkbox",  "cssClass": "approval"}
]

const handbookAssociations = [
    {"dropdown": "All", "route": "all_policies"},
    {"dropdown": "Employee Handbook", "route": "employee_policies"},
    {"dropdown": "Family Handbook", "route": "family_policies"},
    {"dropdown": "Extracurricular Handbook", "route": "extracurricular_policies"},
    {"dropdown": "All Approved", "route": "approved"},
    {"dropdown": "Amended", "route": "amended"},
    {"dropdown": "Board Action Needed", "route": "board_pending"},
    {"dropdown": "Admin Action Needed", "route": "admin_pending"},
]


function showHide() {
    //Find the css class associated with the option selected and toggle the hidden class to all elements of that css class.

    let cssClass = '';
    console.log(this.id);

    for (const item of formAssociations) {
        if (item.checkbox == this.id) {
            cssClass = item.cssClass
        }
    }
    const elements = document.getElementsByClassName(cssClass);

    //Rewrite this to overwrite the hidden status based on the the property 'checked' of the checkbox:
    for (const element of elements) {
        element.classList.toggle('hidden');
    }

}

//Refresh Policy Table
const refreshPolicyTable = async ()=> {
    
    const request = await fetch(handbookSelector.value); //Get the table json from the specified route.
    try {
        const policyTable = await request.json(); //Convert the response to JSON

        for (let selectedPolicyIndex=0; selectedPolicyIndex<policyTable.length; selectedPolicyIndex++) {
            document.getElementById(`${policyTable[selectedPolicyIndex].policy_id}-policy-number`).innerText = `${policyTable[selectedPolicyIndex].policy_number}\u2003`;
            document.getElementById(`${policyTable[selectedPolicyIndex].policy_id}-policy-title`).innerText = `${policyTable[selectedPolicyIndex].title}\u2002`;
            document.getElementById(`${policyTable[selectedPolicyIndex].policy_id}-content`).innerText = `${policyTable[selectedPolicyIndex].content}`;
            document.getElementById(`${policyTable[selectedPolicyIndex].policy_id}-handbooks`).remove;
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
            document.getElementById(`${policyTable[selectedPolicyIndex].policy_id}-policy-heading`).appendChild(handbookSpan);
            
            document.getElementById(`${policyTable[selectedPolicyIndex].policy_id}-approval`).innerText = `${policyTable[selectedPolicyIndex].status} on ${policyTable[selectedPolicyIndex].date} by ${policyTable[selectedPolicyIndex].entity}`;

        }       

    }catch(error){
        console.log("error", error);
    }

}


//This function was AI generated and needs to be checked:
function loadHandbook() {
    let route = '';
    
    //Call loadPolicyTable from loadactions.js with the route associated with the selected handbook
    loadPolicyTable(this.value);
}

//Create Handbook options from the handbookSelectors array
const handbookSelector = document.getElementById('handbook-selector');
for (const item of handbookAssociations) {
    const option = document.createElement('option');
    option.value = item.route;
    option.text = item.dropdown;
    handbookSelector.appendChild(option);
}

//Attach Event Listeners
for (const object of document.getElementsByClassName('sidebar-checkbox')) {
    object.addEventListener('click', showHide); 
}
for (const item of handbookAssociations) {
    document.getElementById('handbook-selector').addEventListener('change', loadHandbook);
}
document.getElementById('refresh').addEventListener('click', refreshPolicyTable);
