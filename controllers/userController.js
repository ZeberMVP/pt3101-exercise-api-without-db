const fs = require('fs');
const usersPath = '../db/users.json';

const users = () => {
    const usersJSON = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(usersJSON);
    return users;
}

const deleteUser = (req, res) => {
    for (let user of users) {
        if (user.email === req.body) {
            if (user.deleted === true){
                delete user;
            }
            break;
        }
    }
    fs.writeFileSync(usersPath, JSON.stringify(users));
    res.status(200).send("The user has been deleted definetly");
}


module.exports = {
    deleteUser
}