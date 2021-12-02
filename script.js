// handle submit button click event
document.getElementById('submitBtn').addEventListener("click", function checkForm(event) {
    
    let nameString = document.getElementById("nameText").value
    let valid = true
    
    // [Form Validation] name must be less than 255 characters
    if (nameString.length > 255) {
        if (!document.getElementById("nameError")){
            let error = document.createElement("p")
            error.innerHTML = "Name must be less than 255 characters"
            error.id = "nameError"
            error.style = "color: red; font-style: italic; font-size: 12px"
            document.getElementById("nameForm").insertBefore(error, document.getElementById("genderRadioLabel"))
        }
        event.preventDefault()
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
        event.preventDefault()
        valid = false
    } else {
        if (document.getElementById("regexError")){
            document.getElementById("regexError").remove()
        }
    }    
    
})


