// handle click event of submit button
document.getElementById('submitBtn').addEventListener("click", function submitHandler(event) {
    
    let nameString = document.getElementById("nameText").value
    let valid = true
    
    // [Form Validation] name must be more than one and less than 255 characters
    if (nameString.length > 255 || nameString.length < 1) {
        // If the name error message doesn't exists create it
        if (!document.getElementById("nameError")){
            let error = document.createElement("p")
            error.innerHTML = "Name must be more than one and less than 255 characters"
            error.id = "nameError"
            error.style = "color: red; font-style: italic; font-size: 12px"
            document.getElementById("nameForm").insertBefore(error, document.getElementById("genderRadioLabel"))
        }
        valid = false
    } else {
        // If the name error message exists remove it
        if (document.getElementById("nameError")){
            document.getElementById("nameError").remove()
        }
    }
    
    // [Form Validation] name must include letters and space (using regular expression)
    let reg_expr = /^[a-zA-Z\s]*$/;
    if (!nameString.match(reg_expr)) {
        // If the regular expression error message doesn't exists create it
        if (!document.getElementById("regexError")){
            let error = document.createElement("p")
            error.innerHTML = "Name must include letters and space"
            error.id = "regexError"
            error.style = "color: red; font-style: italic; font-size: 12px"
            document.getElementById("nameForm").insertBefore(error, document.getElementById("genderRadioLabel"))
        }
        valid = false
    } else {
        // If the name error message exists remove it
        if (document.getElementById("regexError")){
            document.getElementById("regexError").remove()
        }
    }
    
    if (valid) {
        // If we saved the name before then, display the gender in saved answer section
        if (localStorage.getItem(nameString.toLowerCase())) {
            let gender = localStorage.getItem(nameString.toLowerCase())
            let savedAns = nameString + ", " + gender
            document.getElementById("savedAnswerText").innerHTML = savedAns
        } else {
            // If didn't save the name before then clear the previous result
            document.getElementById("savedAnswerText").innerHTML = "--"
        }
        
        // If form is valid then send request to https://api.genderize.io/ and show results
        fetch("https://api.genderize.io/?name=" + nameString)
        .then(response => response.json())
        .then(function handleResponse(obj) {
            // If the response error message exist then, remove it
            if (document.getElementById("responseError")) {
                document.getElementById("responseError").remove()
            }
            // Update prediction of gender based on response + Make first letter uppercase :)
            document.getElementById("genderResult").innerHTML = obj.gender.charAt(0).toUpperCase() + obj.gender.slice(1)
            // Update prediction of gender based on response
            document.getElementById("probabilityResult").innerHTML = obj.probability

        })
        .catch(error => {
            // If we don't get any result then clear the previous result
            document.getElementById("genderResult").innerHTML = "--"
            document.getElementById("probabilityResult").innerHTML = "--"
            // Create response error message
            let errorMsg = document.createElement("p")
            errorMsg.innerHTML = "No response was received for the entered name"
            errorMsg.id = "responseError"
            errorMsg.style = "color: red; font-style: italic; font-size: 12px"
            document.getElementById("predictionContainer").insertBefore(errorMsg, document.getElementById("predictionDL"))
        })
    }
    // prevent form from submit as default
    event.preventDefault() 
})

// Handler of save button
document.getElementById("saveBtn").addEventListener("click", function saveHandler() {
    if (document.querySelector('input[name="gender"]:checked') != null) {
        // If save error message exists then remove it
        if (document.getElementById("saveError")) {
            document.getElementById("saveError").remove()
        }
        
        // Save entered name to local storage (Name, Gender)
        let name = document.getElementById("nameText").value
        let gender = document.querySelector('input[name="gender"]:checked').value
        localStorage.setItem(name.toLowerCase(), gender.toLowerCase())
    } else {
        // If there is no gender to save then create a save error message
        let error = document.createElement("p")
        error.innerHTML = "Choose one of the genders"
        error.id = "saveError"
        error.style = "color: red; font-style: italic; font-size: 12px"
        document.getElementById("nameForm").insertBefore(error, document.getElementById("submitBtn"))
    }
    
})

// Handler of clear button
document.getElementById("clearBtn").addEventListener("click", function clearHandler() {
    // If there is something in saved answer section to clear then clear it
    if (document.getElementById("savedAnswerText").innerHTML != '--') {
        key = document.getElementById("savedAnswerText").innerHTML.split(", ")[0]
        localStorage.removeItem(key)
        document.getElementById("savedAnswerText").innerHTML = "--"
    }
})


