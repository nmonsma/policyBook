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
    {"dropdown": "All", "route": "allPolicies"},
    {"dropdown": "Employee Handbook", "route": "employeePolicies"},
    {"dropdown": "Family Handbook", "route": "familyPolicies"},
    {"dropdown": "Extracurricular Handbook", "route": "extracurricularPolicies"}
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