const countries = [{
        name: 'Nigeria',
        continent: 'Africa'
    },
    {
        name: 'Nepal',
        continent: 'Asia'
    },
    {
        name: 'Angola',
        continent: 'Africa'
    },
    {
        name: 'Greece',
        continent: 'Europe'
    },
    {
        name: 'Kenya',
        continent: 'Africa'
    },
    {
        name: 'Greece',
        continent: 'Europe'
    }
]

let asianCountries = countries.filter(country => {
    return country.continent === 'Africa';
});

console.log(asianCountries);

const girls = [{
        name: 'Sarah',
        age: 19
    },
    {
        name: 'Laura',
        age: 10
    },
    {
        name: 'Jessy',
        age: 29
    },
    {
        name: 'Amy',
        age: 23
    }
];

let girlsAges = girls.map((girl) => girl.age);

console.log(girlsAges); //[19, 10, 29, 23]

var json = {
    'homes': [{
        "home_id": "1",
        "price": "925",
        "sqft": "1100",
        "num_of_beds": "2",
        "num_of_baths": "3.0",
    }, {
        "home_id": "2",
        "price": "1425",
        "sqft": "1900",
        "num_of_beds": "4",
        "num_of_baths": "2.5",
    }, {
        "home_id": "3-will-be-matched",
        "price": "925",
        "sqft": "1000",
        "num_of_beds": "2",
        "num_of_baths": "2.5",
    }]
};

var newArray = json.homes.filter(function(el) {
    return el.price <= 1000 &&
        el.sqft >= 500 &&
        el.num_of_beds >= 2 &&
        el.num_of_baths >= 2.5;
});
console.log(newArray);