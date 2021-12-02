// handle submit button click event
document.getElementById('submitBtn').addEventListener("click", function checkForm(event) {
    
    let nameString = document.getElementById("nameText").value
    let valid = true
    
    // [Form Validation] name must be less than 255 characters
    if (nameString.length > 255 || nameString.length < 1) {
        if (!document.getElementById("nameError")){
            let error = document.createElement("p")
            error.innerHTML = "Name must be more than one and less than 255 characters"
            error.id = "nameError"
            error.style = "color: red; font-style: italic; font-size: 12px"
            document.getElementById("nameForm").insertBefore(error, document.getElementById("genderRadioLabel"))
        }
        valid = false
    } else {
        if (document.getElementById("nameError")){
            document.getElementById("nameError").remove()
        }
    }
    
    // [Form Validation] name must include letters and space
    let reg_expr = /^[a-zA-Z\s]*$/;
    if (!nameString.match(reg_expr)) {
        if (!document.getElementById("regexError")){
            let error = document.createElement("p")
            error.innerHTML = "Name must include letters and space"
            error.id = "regexError"
            error.style = "color: red; font-style: italic; font-size: 12px"
            document.getElementById("nameForm").insertBefore(error, document.getElementById("genderRadioLabel"))
        }
        valid = false
    } else {
        if (document.getElementById("regexError")){
            document.getElementById("regexError").remove()
        }
    }
    
    // If form is valid then send request to https://api.genderize.io/ and show results
    if (valid) {
        fetch("https://api.genderize.io/?name=" + nameString)
        .then(response => response.json())
        .then(function handleResponse(obj) {
            // Update prediction of gender based on response + Make first letter uppercase :)
            document.getElementById("genderResult").innerHTML = obj.gender.charAt(0).toUpperCase() + obj.gender.slice(1)
            // Update prediction of gender based on response
            document.getElementById("probabilityResult").innerHTML = obj.probability

        })
        .catch(error => {
            console.log("There has been a problem with your fetch operation")
        })
    }
    event.preventDefault()
    
})


