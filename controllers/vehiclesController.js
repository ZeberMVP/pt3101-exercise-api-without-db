const fs = require('fs');
const usersPath = './db/users.json';

const usersJSON = fs.readFileSync(usersPath, 'utf8');
const users = JSON.parse(usersJSON);

const allVehicles = (req, res) => {
    let arr = [];
    if (req.query.hasOwnProperty("fuel")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (!arr.includes(vehicle) && vehicle.fuel === req.query.fuel) {
                    arr.push(vehicle);
                }
            }
        }
    } else {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (!arr.includes(vehicle)) {
                    arr.push(vehicle);
                }
            }
        }
    }
    res.status(200).json(arr);
}

module.exports = {
    allVehicles
}