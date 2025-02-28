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
    {"dropdown": "Employee", "route": "employeePolicies"},
    {"dropdown": "Family", "route": "familyPolicies"},
    {"dropdown": "Extracurricular", "route": "extracurricularPolicies"}
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
function showHideHandbook() {

    let route = '';
    console.log(this.value);

    for (const item of handbookAssociations) {
        if (item.dropdown == this.value) {
            route = item.route
        }
    }
    //Make a request to the server for the appropriate policies
    fetch(`/${route}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //Update the page with the new data
        })
}


//Attach Event Listeners
for (const object of document.getElementsByClassName('sidebar-checkbox')) {
    object.addEventListener('click', showHide); 
}