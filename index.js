/*!
 * mongo-faker-seed
 *
 * A tool with FAKER.js power to quickly populate your mongo db from a .json file.
 */
var MongoClient = require('mongodb').MongoClient;
var faker = require('faker');

var fakerIdentifier = '@faker';
var fakerOriginalIdentifier = 'faker'; 

Promise.each = async function(arr, fn) {
  for(const item of arr) await fn(item);
}

function parseTemplateJson(template , howMany){
  var parsedArray = [];
  for(var i = 0; i < howMany; i++) {
    parsedArray[i] = {};
    for(key in template){
      if(template[key].includes(fakerIdentifier)){
        parsedArray[i][key] = eval(template[key].replace(fakerIdentifier, fakerOriginalIdentifier));
      }else{
        parsedArray[i][key] = template[key];
      }
    }; 
  }
  return parsedArray
}

function parseJson(json){
  return json.map(o=>{
    for(key in o){
      if(o[key].includes(fakerIdentifier)){
        o[key] = eval(o[key].replace(fakerIdentifier, fakerOriginalIdentifier));
      }
    }
    return o;
  });
}

async function initialize (dbUri, dbName, jsonData) { 
  const client = await MongoClient.connect(dbUri);
  const db = client.db(dbName); 
  Promise.each(jsonData, async function(item){
      data = [];
      if(item.replace || 
        (!item.replace && await db.collection(item.collectionName).countDocuments() === 0)){
        if(item.data && item.data.length > 0){
          parsedArray = parseJson( item.data);
          Array.prototype.push.apply(data,parsedArray);
        }
        if(item.template){
          parsedTemplateArray = parseTemplateJson(item.template, item.howMany);
          Array.prototype.push.apply(data,parsedTemplateArray);
        } 
        if(data.length > 0){
          db.collection(item.collectionName).insertMany(data);
        }
      }
    });
    client.close();
}

module.exports = initialize
