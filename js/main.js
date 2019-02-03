const companies = [{
        name: "Company One",
        category: "Finance",
        start: 1981,
        end: 2004
    },
    {
        name: "Company Two",
        category: "Retail",
        start: 1992,
        end: 2008
    },
    {
        name: "Company Three",
        category: "Auto",
        start: 1999,
        end: 2007
    },
    {
        name: "Company Four",
        category: "Retail",
        start: 1989,
        end: 2010
    },
    {
        name: "Company Five",
        category: "Technology",
        start: 2009,
        end: 2014
    },
    {
        name: "Company Six",
        category: "Finance",
        start: 1987,
        end: 2010
    },
    {
        name: "Company Seven",
        category: "Auto",
        start: 1986,
        end: 1996
    },
    {
        name: "Company Eight",
        category: "Technology",
        start: 2011,
        end: 2016
    },
    {
        name: "Company Nine",
        category: "Retail",
        start: 1981,
        end: 1989
    }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

/*for (let i = 0; i < companies.length; i++) {
    console.log(companies[i].name);
}*/

/*companies.forEach(function(company) {
    console.log(company.name);
});*/

/*const FilteredAges = ages.filter(function(age) {
    return age > 35;
});*/

/*const FilteredAges = ages.filter(age => (age > 35));
console.log(FilteredAges);*/

//const RetailCompany = companies.filter(company => (company.category === 'Retail'));

//const CompanyIn80s = companies.filter(company => (company.start >= 1980 && company.start <= 1990));

//const YearCompany10 = companies.filter(company => ((company.end - company.start) >= 10));

/*const CompanyNames = companies.map(function(company) {
    return company.name;
});*/

//const companyMap = companies.map(company => (`${company.name} started on ${company.start} and ended on ${company.end}`));

//const getSquareRoot = ages.map(age => Math.sqrt(age));

/*const ageMap = ages
    .map(age => Math.sqrt(age))
    .map(age => Math.floor(age));*/

/*const SortedCompanies = companies.sort(function(company1, company2) {
    if (company1.end > company2.end) {
        return 1;
    } else {
        return -1;
    }
});*/

//const SortedCompanies = companies.sort((company1, company2) => (company1.start > company2.start ? 1 : -1));

/*const AgeSum = ages.reduce(function(total, age) {
    return total + age;
}, 0);*/

//const ageSum = ages.reduce((total, age) => (total + age), 0);

/*const totalYears = companies.reduce(function(total, company) {
    return total + company.start;
}, 0);*/

const totalYears = companies.reduce((total, company) => (total + (company.end - company.start)), 0);


console.log(totalYears);