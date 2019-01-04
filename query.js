{
    user(id: "23") {
        firstName,
        age,
        company {
            name
        }
    }
}

// fragment

{
    apple: company(id: "2") {
...companyDetails
}

}

fragment companyDetails on Company {
    id,
        name,
        description
}


// mutation

mutation {
    addUser(firstName: "teste", age: 5) {
        id,
        firstName,
        age
    }
}
