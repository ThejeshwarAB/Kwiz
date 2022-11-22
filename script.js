const form = document.querySelector('.form');
const result = document.querySelector('.result');

// data variables
var json = {};
var qna = [];
var score = 0;

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
    qna = qna.slice(0, 5);

    // tracking variables
    var templateString = '';
    // var mainIndex = 0; // tracks the no. of questions

    // shuffles the qna everytime
    shuffleArray(qna);
    // console.log(qna)
    
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

            // each question in the quiz
            tempString += `<div class='form-check'>
                                <input class="form-check-input" type="radio" name="${tempNumber}" 
                                    id="${tempNumber}" value="${tempArray[randomNo]}" ${isChecked}>
                                <label class="form-check-label" for="${tempArray[randomNo]}">
                                    ${tempArray[randomNo]}
                                </label>
                            </div>`

            tempArray = tempArray.filter(item => item !== tempArray[randomNo])
            index++;
        }
        // mainIndex++;

        // entire set of questions in the quiz
        templateString +=
            `<div class='card p-3 col-md-8 col-sm-12'>
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
    score = 0; // clears score for every submission
    const formElements = Array.from(e.target)
    formElements.forEach(item => {
        if (item.tagName == 'INPUT' &&
            item.className == 'form-check-input' &&
            item.checked == true) {

            item.parentNode.parentNode.parentNode.classList.add('incorrect'); 
            // marks every answer as incorrect initially

            for (var index = 0; index < qna.length; index++) {
                if (item['name'] === qna[index].questionNumber && item['value'] === qna[index].answer) {
                    score++;
                    item.parentNode.parentNode.parentNode.classList.add('correct');
                    item.parentNode.parentNode.parentNode.classList.remove('incorrect');
                    // flips the status only for the correct answers
                }
            }
        }
    })
    scrollTo(0, 0); // scrolls to top of the screen
    result.innerHTML = `<p class="text-center">You scored 
                        <span class='fw-bold'> ${score / 5 * 100}% </span> <br>
                        Review your selections</p>`;
})