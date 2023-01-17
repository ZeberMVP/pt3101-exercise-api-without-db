const fs = require('fs');
const usersPath = '../db/users.json';

const users = () => {
    const usersJSON = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(usersJSON);
    return users;
}

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