const usersInitialData = [{
    name: {
        first: "John",
        middle: "D",
        last: "Doe"
    },
    phone: "0501234567",
    email: "johndoe@email.com",
    password: "Secure!1234",
    image: {
        url: "",
        alt: "John Doe profile picture"
    },
    address: {
        state: "IL",
        country: "Israel",
        city: "Tel Aviv",
        street: "Herzl",
        houseNumber: 12,
        zip: 6100001
    },
    isBusiness: true,
    isAdmin: true
}, {
    name: {
        first: "Jane",
        middle: "A",
        last: "Smith"
    },
    phone: "0523456789",
    email: "janesmith@email.com",
    password: "Jane!5678Pass",
    image: {
        url: "",
        alt: "Jane Smith profile picture"
    },
    address: {
        state: "IL",
        country: "Israel",
        city: "Haifa",
        street: "Ben Gurion",
        houseNumber: 4,
        zip: 3200001
    },
    isBusiness: true,
    isAdmin: false
}, {
    name: {
        first: "Michael",
        middle: "B",
        last: "Johnson"
    },
    phone: "0549876543",
    email: "michaeljohnson@email.com",
    password: "Mik3!1234Pass",
    image: {
        url: "",
        alt: "Michael Johnson profile picture"
    },
    address: {
        state: "IL",
        country: "Israel",
        city: "Jerusalem",
        street: "King David",
        houseNumber: 8,
        zip: 9312101
    },
    isBusiness: false,
    isAdmin: false
}];

module.exports = usersInitialData;