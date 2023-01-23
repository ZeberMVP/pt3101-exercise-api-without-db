const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '..', 'db', 'users.json');

const usersJSON = fs.readFileSync(usersPath, 'utf8');
const users = JSON.parse(usersJSON);

const allFoods = (req, res) => {
    let arr = [];
    for (let user of users){
        for (let food of user.favouritesFood){
            if (!arr.includes(food)) {
                arr.push(food)
            }
        }
    }
    res.status(200).json(arr);
}

module.exports = {
    allFoods
}