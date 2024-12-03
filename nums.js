BASE_URL = `http://numbersapi.com/`;

const favNumList = document.querySelector('#fav-num');
const otherNumList = document.querySelector('#other-nums');

// *****************************************************************************************
// get single fact for a number, console.log result
// *****************************************************************************************
async function favNumberFacts() {
    try {
        let numFacts = await axios.get(`${BASE_URL}24?json`)
        console.log(numFacts.data.text)
    }
    catch (e) {
        (console.log(e))
    };
}
// *****************************************************************************************

// get 4 facts about single number and add to ul
async function fourFavNumFacts() {
    let promises = [];
    for (let i = 1; i <= 4; i++) {
        promises.push(axios.get(`${BASE_URL}24?json`))
    };
    try {
        let facts = await Promise.all(promises);
        facts.forEach(fact => {
            newLi = document.createElement('li');
            newLi.innerHTML = fact.data.text;
            favNumList.appendChild(newLi);
        })
    }
    catch (e) {
        console.log(e)
    }
}

// get facts for multiple different numbers and add to ul
async function multiNumberFacts() {
    let nums = [15, 23, 8, 21];
    try {
        let facts = await axios.get(`${BASE_URL}${nums}?json`);
        for (let fact in facts.data){
            let newLi = document.createElement('li');
            newLi.innerHTML = facts.data[fact];
            otherNumList.appendChild(newLi);
        }
    }
    catch (e) {
        console.log(e)
    }
};

// fills page using functions above.
function fillPage() {
    fourFavNumFacts();
    multiNumberFacts();
};

fillPage();