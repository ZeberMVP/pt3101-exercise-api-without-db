const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '..', 'db', 'users.json');

const usersJSON = fs.readFileSync(usersPath, 'utf8');
const users = JSON.parse(usersJSON);

const deleteUser = (req, res) => {
    for (let i = 0;  i < users.length; i++) {
        if (users[i].email === req.body.email) {
            if (users[i].deleted === true){
                users.splice(i, 1)
            } else {
                res.send("The user must be hidden before being deleted");
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