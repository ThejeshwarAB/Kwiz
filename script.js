const form = document.querySelector('.form');
const title = document.querySelector('.title');

var json = {};
var qna = [];

// gets the local json data
async function getData(url) {
    json = await fetch(url)
        .then(result => result.json())
}

// Durstenfeld's shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

window.onload = async () => {
    // gets json data
    await getData('./qna.json');
    qna = json['qna'];

    // tracking variables
    var templateString = '';
    var mainIndex = 0; // tracks the no. of questions

    shuffleArray(qna);
    console.log(qna)
    // iterating through each elements
    qna.forEach(element => {

        //  temporary variables
        var tempString = '';
        var tempArray = element["answerOptions"];
        var tempNumber = element["questionNumber"];
        var index = 0; //  tracks the no. of answer options
        var isChecked = '';

        // randomize the options
        while (index !== 3) {
            var randomNo = Math.floor(Math.random() * (tempArray.length));

            // checks the first option by default
            isChecked = index === 0 ? 'checked' : ''

            tempString += `<div class='form-check'>
                                <input class="form-check-input" type="radio" name="q${mainIndex}${tempNumber}" 
                                    id="${tempNumber}" value="${tempArray[randomNo]}" ${isChecked}>
                                <label class="form-check-label" for="${tempArray[randomNo]}">
                                    ${tempArray[randomNo]}
                                </label>
                            </div>`

            tempArray = tempArray.filter(item => item !== tempArray[randomNo])
            index++;
        }
        mainIndex++;

        templateString +=
            `<div class='card p-3 m-3 col-6'>
                <p>${element["question"]}</p>
                <div class="form-check">
                ${tempString}
                </div>
            </div>`
    });
    // updates the form with questions on
    form.innerHTML = templateString + form.innerHTML;
}

form.addEventListener('submit', e => {
    e.preventDefault(); // prevents the page from reloading
    console.log(form)
    for (var index = 0; index < 3; index++) {
        var tempName = 'q' + index.toString();
        console.log(index)
        console.log(form[tempName].value);
        // if(form[tempName].value===)
    }
})