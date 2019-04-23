## MONGO-SEED-FAKER

A tool to easilly populate mongodb database with power of [faker.js](https://www.npmjs.com/package/faker) 


# Installation

```js
npm i mongo-seed-faker
```


## Usage


```js
const mongoSeedFaker =  require("mongo-seed-faker");

const mongoUri = 'mongodb://localhost:27017/test';
const dbName = 'test';
const seedData = [{
	collectionName: 'users',
	replace: true,
	// if want to populate same structure of data multiple times
	template: { name: '@faker.name.findName()', email: 'Some static value' },
	// how many times to populate data specified by 'template' 
	howMany: 10,
	
	// We can also pass mulitple documents and all document structure can be differs
	data:[{name: '@faker.name.findName()', email: 'Some static value' },
	{name: '@faker.name.findName()', email: 'random different email' },]
}];

// or if you want to use json file replace seedData with seedDataFromFile in mongoSeedFaker function below
const seedDataFromFile = JSON.parse(require('./seedData.json'));

mongoSeedFaker(mongoUri, dbName, seedData);
```


## Seed Data Object Keys



|             Key   |Data type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|collectionName|`STRING e.g. 'users'`            | Name of mongodb's collection             |
|replace          |`BOOLEAN e.g. true`            |Should populate if collection have some data already?            |
|template          |`OBJECT e.g. { name: 'Test'}`|Structure to follow when populating database|
|howMany|`NUMBER e.g. 10` | How many documents to make with template stucture 
| data |`ARRAY OF OBJECTS e.g. [{name: 'Test'}]`| Array of documents that needs to be populated



## How to use faker.js with inside seedData

We can use faker.js in both 'template' and 'data' in seedData object like this:-
`name: '@faker.name.firstName()'`

Just add '@' on front of faker.js function and make it string.  
e.g. faker.name.firstName() should be '@faker.name.firstName()' so that it parses properly.

 [click here to see availble faker.js methods](https://www.npmjs.com/package/faker)



### That's it

> **Note:** Developement is in progress and there are still more features to come :).
