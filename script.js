const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');
const title = document.querySelector('.title');

var json = {};
var qna = [];

// gets the local json data
async function getData(url) {
    json = await fetch(url)
        .then(result => result.json())
}

form1.addEventListener('submit', async e => {

    // prevents page reload on submit
    e.preventDefault();

    // hides pref form, displays qna form
    form1.classList.add('d-none');
    form2.classList.remove('d-none');

    // gets json data
    await getData('./qna.json');
    console.log(json);


    qna = json['qna'];

    var templateString = '';

    qna.forEach(element => {
        (element["answerOptions"].forEach(answerOption=>console.log(answerOption)))
        templateString +=
            `
        <div class='card p-3 m-3 col-6'>
            <p>${element["question"]}</p>
            <div class="form-check">
            ${element["answerOptions"].forEach(answerOption => {
                `<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                        ${answerOption}
                    </label>`
            })}

            </div>
        </div>
        `
        // console.log(element)
    });

    form2.innerHTML = templateString;


})