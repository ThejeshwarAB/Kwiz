const form = document.querySelector('.form');
const title = document.querySelector('.title');

var json = {};
var qna = [];

// gets the local json data
async function getData(url) {
    json = await fetch(url)
        .then(result => result.json())
}

// form1.addEventListener('submit', async e => {
    window.onload = async () => {

    // prevents page reload on submit
    // e.preventDefault();

    // hides pref form, displays qna form
    // form1.classList.add('d-none');
    // form2.classList.remove('d-none');

    // gets json data
    await getData('./qna.json');
    console.log(json);


    qna = json['qna'];

    var templateString = '';
    var mainIndex = 0;

    qna.forEach(element => {

        var tempString = '';
        var tempArray = element["answerOptions"];
        var index = 0;
        var isChecked = '';

        while (index !== 3) {

            // console.log("Called")

            var randomNo = Math.floor(Math.random() * (tempArray.length - 1));

            isChecked = index === 0 ? 'checked' : ''

            tempString += `<div class='form-check'>
                                <input class="form-check-input" type="radio" name="${mainIndex}" 
                                    id="${tempArray[randomNo]}" ${isChecked}>
                                <label class="form-check-label" for="${tempArray[randomNo]}">
                                    ${tempArray[randomNo]}
                                </label>
                            </div>`

            tempArray = tempArray.filter(item => item !== tempArray[randomNo])

            index++;
        }

        mainIndex++;

        // console.log(tempString)

        templateString +=
            `
        <div class='card p-3 m-3 col-6'>
            <p>${element["question"]}</p>
            <div class="form-check">

                ${tempString}

            </div>
        </div>
        `
        // console.log(element)
    });

    form.innerHTML = templateString + form.innerHTML;


}