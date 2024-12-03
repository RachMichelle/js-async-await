// *****************************************************************************************
// get single card from new shuffled deck, console.log result
// // *****************************************************************************************
// async function pickACard() {
//     try {
//         let card = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//         console.log(card.data.cards[0].value, 'of', card.data.cards[0].suit)
//     }
//     catch (e) {
//         console.log(e)
//     }
// }
// *****************************************************************************************
// // get 2 cards from same deck, console.log result
// *****************************************************************************************
// async function pickCardSameDeck() {
//     try {
//         let card1 = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//         let deck = card1.data.deck_id
//         console.log(card1.data.cards[0].value, 'of', card1.data.cards[0].suit)
//         let card2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
//         console.log(card2.data.cards[0].value, 'of', card2.data.cards[0].suit)
//     }
//     catch (e) {
//         console.log(e)
//     }
// }
// *****************************************************************************************

const startButton = document.querySelector('#start-button');
const pickButton = document.querySelector('#pick-button');
const restartButton = document.querySelector('#restart-button');
const card = document.querySelector('#card');
const countHeader = document.querySelector('h3')
const count = document.querySelector('#count')

const deck = {
    async create() {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        this.deckID = res.data.deck_id;
    },
    async draw() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`)
        return res;
    }
};

async function start() {
    await deck.create();
    startButton.classList.add('hidden');
    pickButton.classList.remove('hidden');
    countHeader.classList.remove('hidden');
};

async function restart() {
    await deck.create();
    restartButton.classList.add('hidden');
    pickButton.classList.remove('hidden');
    card.src = "https://kofc14406.org/wp-content/uploads/2018/04/playing-cards-bicycle-rider-back-1_1024x1024.png"
    count.innerText = '52'
};

async function getCard() {
    res = await deck.draw();
    card.src = res.data.cards[0].image;
    count.innerText = res.data.remaining;
    if (res.data.remaining === 0) {
        pickButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
    };
}

startButton.addEventListener('click', start);

pickButton.addEventListener('click', getCard);

restartButton.addEventListener('click', restart);