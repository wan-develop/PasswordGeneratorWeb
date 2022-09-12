
const output = document.querySelector("h2#output")
const charRangeLength = document.querySelector("input#range-password-length")
const charCount = document.querySelector("h2#counter-value")

const generateButton = document.querySelector("a#generate-button")
const copyButton = document.querySelector("a#copy-button")

const checkBoxes = {

    upper: document.querySelector("input#allow-upper-case"),
    lower: document.querySelector("input#allow-lower-case"),
    numbers: document.querySelector("input#allow-numbers"),
    symbols: document.querySelector("input#allow-symbols")

}


const letters = "abcdefghijklmnopqrstuvwxyz"
const symbols = "!@#$%&*(){}[]^/,.<>;:"
const numbers = "0123456789"


const chars = {
    upperCaseLetters:  Array.from(letters.toUpperCase()),
    lowerCaseLetters:  Array.from(letters),
    numbersArray:      Array.from(numbers),
    symbolsArray:      Array.from(symbols),
}

//return a random number between min and max
const random = (min, max) => Math.round(Math.random() * (max - min) + min) 

//returns a random element from the list
const choice = ( list ) => list[random(0, list.length - 1)]



function getSelectedCharsList() {

    let charsArray = []

    if( checkBoxes.upper.checked ) charsArray.push(...chars.upperCaseLetters);
    if( checkBoxes.lower.checked ) charsArray.push(...chars.lowerCaseLetters);
    if( checkBoxes.numbers.checked ) charsArray.push(...chars.numbersArray);
    if( checkBoxes.symbols.checked ) charsArray.push(...chars.symbolsArray);

    return charsArray

}

//console.log(getSelectedCharsList())


function generateRandomPassword(length= 4) {

    let password = ""

    const selectedChars = getSelectedCharsList()

    for( let i=0; i<length; i++)
        password += choice(selectedChars)

    return password

}


//console.log(generateRandomPassword(10))


function setStrength( lights=1) {

    const meterState = document.querySelector("p#meter-state")

    lights = lights > 4 ? 4 : lights

    const meter = document.querySelector("ul#points")

    const points = Array.from( meter.children )

    //RESET ALL LIGHTS
    points.forEach( light => {
        if( !light.classList.contains("light-off"))
            light.classList.toggle("light-off")
    })


    for( let i=0; i<lights; i++) {

        points[i].style.backgroundColor = points[i].getAttribute("data-color")
        points[i].classList.toggle("light-off")
    }


    const meterData = {
        4: "STRONG",
        3: "GOOD",
        2: "EASY",
        1: "BAD",
        0: "123?"
    }

    meterState.innerText = meterData[lights]


}


function checkPasswordStrength( password ) {

    // CHECK THE PASSWORD STRENGTH

    let points = 0

    // if( password.length > 10) return 4
    if( password.length > 6) points += 1

    
    let hasUpper = Array.from(letters.toUpperCase()).some( e => password.includes(e))
    let hasNumber = Array.from(numbers).some( e => password.includes(e))
    let hasSymbol = Array.from(symbols).some( e => password.includes(e))
    

    points += [ hasUpper, hasNumber, hasSymbol].filter( e => e).length
    

    console.log( points )
    return points
    
}


//setStrength(0)



function run() {
    
    const checkBoxesArray = [
        checkBoxes.upper,
        checkBoxes.lower,
        checkBoxes.numbers,
        checkBoxes.symbols
    ]

    
    // checks if any checkbox is checked
    const isAnyChecked = checkBoxesArray.filter( box => box.checked).length > 0
    
    if( !isAnyChecked ) return 
    
    const passwordLength = parseInt( charRangeLength.value )
    
    const generatedPassword = generateRandomPassword(length=passwordLength)
    
    output.innerText = generatedPassword

    //CHECKING STRENGTH
    setStrength( lights= checkPasswordStrength(generatedPassword))


}

//GENERATE BUTTON HANDLER
generateButton.addEventListener("click", run)

//RANGE INPUT HANDLER
charRangeLength.addEventListener("input", (element)=>{
    charCount.innerText = element.target.value
})

//COPYBUTTON HANDLER
copyButton.addEventListener("click", ()=> {

    navigator.clipboard.writeText(output.innerText);
    alert("password saved to clipboard")

})