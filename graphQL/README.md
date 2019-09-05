## GraphQL features
~~~
1. retrieve the exact number of data as expected
2. retrieve multiple resources with only one request
3. all arguments are descripable
~~~
## GrapQL helloword
~~~
const express = require('express')
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

//define the type of query
const schema = buildSchema(
    `
    type Account {
        name: String,
        age: Int,
        sex: String,
        department: String
    }
    type Query {
        hello: String,
        account: Account
    }`
)

//implement the query
const root = {
    hello: () => {
        return `hello world`
    },
    //obj type
    account: () => {
        return {
        name: 'suloan',
        age: 18,
        sex: 'femal',
        department: 'lisi'
    }
    }
}

const app = express()

app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    grapiql: true
}))
app.listen(3000)

//use it
query {
    hello
}
~~~
## Query with arguments
~~~
const express = require('express')
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

//define the type of query
const schema = buildSchema(
    `
    type Account {
        name: String,
        age: Int,
        sex: String,
        department: String,
        salary(city: String): Int
    }
    type Query {
        getClassMates(classNO: Int!):[String]
        account(username: String): Account
    }`
)

//implement the query
const root = {
  getClassMates({classNO}) {
      const obj = {
          2: ['li', 'wo', 'ta'],
          3: ['ii', 'oo', 'aa'],
      }
      return obj[2]
  },
  account({username}) {
      const name = username
      const sex = 'male'
      const age = 18
      const department= 'R&D'
      const salary = ({city}) => {
          if (city === 'beijing') {
              return 10000;
          } else {
              return 3000;
          }
      }
      return {
          name,
          sex,
          age,
          department,
          salary,
      }
  }
}

const app = express()

app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    grapiql: true
}))
app.listen(3000)

//use it
query {
    getClassMates(2)
    account(username: 'slogan') {
        name
        salary(city: 'beijing')
    }
}
~~~
## Client Get Data
~~~
function getData() {
    //Account first letter should be capital, paramter $username should add $ in the front
    const query = `
        query Account($username: String, $city: String) {
            account(username: $username) {
                name,
                salary(city: $city)
            }
        }
    `
    const variables = { username: 'slogan', city: 'beijing' }

    fetch('graphql', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    }).then(res => res.json)
    .then(json => {
        console.log(json)
    })
}
~~~

## Mutation To Modify Data
~~~
const express = require('express')
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

//define the type of query
const schema = buildSchema(
    `
    type Account {
        name: String,
        age: Int,
        sex: String,
        department: String
    }

    input AccountInput {
        name: String,
        age: Int,
        sex: String,
        department: String
    }

    type Mutation {
        createAccount: (input: AccountInput):Account,
        updateAccount: (id: ID!, input: AccountInput): Account
    }
    
    type Query {
        accounts: [Account]
    }
    
    `
)


const fakeDb = {}

//implement the mutation
const root = {
    accounts() {
        var arr = []
        for (const key in fakeDb) {
            arr.push(fakeDb[key])
        }
        return arr;
    },
    createAccount({input}) {
        fakeDb[input.name] = input;
        return fakeDb[input.name]
    },
    updateAccount({id, input}) {
        const updatedAccount = Object.assign({}, fakeDb[id], input)
        fakeDb[id] = updatedAccount;
        return updatedAccount
    }
}

const app = express()

app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    grapiql: true
}))
app.listen(3000)

//use it
mutation {
    createAccount(input: {
        name: 'sk',
        age: 11,
        sex: 'female',
        department: 'dangdang'
    }) {
        name
        age
        sex
        department
    }
}
~~~
## Security
~~~
const middleware = (req, res, next) => {
    if(req.url.indexOf('/graphql') !== -1 && req.headers.indexOf('auth') === -1) {
        res.send(JSON.stringify({
            error: "you are not authorized"
        }))
        return
    }
    next()
}

app.use()
~~~
## Advanced Features With Mysql
~~~
const express = require('express')
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')
const mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bob',
    password: 'secret',
    database: 'my_db'
})

//define the type of query
const schema = buildSchema(
    `
    type Account {
        name: String,
        age: Int,
        sex: String,
        department: String
    }

    input AccountInput {
        name: String,
        age: Int,
        sex: String,
        department: String
    }

    type Mutation {
        createAccount: (input: AccountInput):Account,
        updateAccount: (id: ID!, input: AccountInput): Account
    }
    
    type Query {
        accounts: [Account]
    }
    
    `
)


//implement the mutation
const root = {
    accounts() {
        return new Promise((resolve, reject) => {
            pool.query('select name, age, sex, department from account', (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                resolve(result)
            })
        })
    },
    createAccount({input}) {
        const data = {
        name: input.name,
        age: input.age,
        sex: input.sex,
        department: input.department
    }
    return new Promise((resolve, reject) => {
        return pool.query('insert into account set ?', data, (err) => {
            if (err) {
                console.log(err)
                return;
            }
            resolve (data);
        })
    })
        
    },
    updateAccount({id, input}) {
        const data = input;
        return new Promise((resolve, reject) => {
            return pool.query('update account set ? where name = ? ', [data, id], (err) => {
                if (err) {
                    console.log(err)
                    return;
                }
                resolve (data);
            })
        })
    }
}

const app = express()

app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    grapiql: true
}))
app.listen(3000)

//use it
mutation {
    createAccount(input: {
        name: 'sk',
        age: 11,
        sex: 'female',
        department: 'dangdang'
    }) {
        name
        age
        sex
        department
    }
}
~~~