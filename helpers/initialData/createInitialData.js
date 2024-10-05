const { getCards, createCard } = require("../../cards/models/cardsAccessDataService");
const { getUsers, registerUser } = require("../../users/models/usersAccessDataService");
const cardsInitialData = require("./cardsInitialData");
const usersInitialData = require("./usersInitialData");

const createInitialData = async () => {
    const users = await getUsers();
    const cards = await getCards();

    if (users.length < 3) {
        usersInitialData.forEach(initialUser => {
            if (!users.find(user => user.email === initialUser.email)) {
                registerUser(initialUser);
            }
        });
        console.log("users created");
        
    }
    if (cards.length < 3) {
        cardsInitialData.forEach(initialCard => {
            if (!cards.find(card => card.bizNumber === initialCard.bizNumber)) {
                createCard(initialCard);
            }
        });
        console.log("cards created");
    }
};

module.exports = createInitialData;