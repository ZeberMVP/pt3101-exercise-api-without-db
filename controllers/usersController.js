const fs = require('fs');
const usersPath = '../db/users.json';
const { v4: uuidv4 } = require('uuid');

const users = () => {
    const usersJSON = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(usersJSON);
    return users;
}

const getUsers = (req, res) => {
    res.status(200).json(users);
};

const getUser = (req, res) => {
    for (let user of users) {
        if (user.username === req.params) {
            res.status(200).json(user);
        }
    }
};

const totalUsers = (req, res) => {
    res.status(200).send(`There are ${users.length} total users`);
}

const usersFrom = (req, res) => {
    let arr = [];
    for (let user of users) {
        if (user.country === req.params) {
            arr.push(user);
        }
    }
    res.status(200).json(arr);
}

const numberOfVehicles = (req, res) => {
    let arr = [];
    for (let user of users) {
        if (req.query.min <= user.vehicles.length && req.query.max >= user.vehicles.length) {
            arr.push(user)
        }
    }
    res.status(200).json(arr);
}

const favoriteFoodIs = (req, res) => {
    let arr = [];
    for (let user of users) {
        if (user.favouritesFood.includes(req.params)) {
            arr.push(user);
        }
    }
    res.status(200).json(arr);
}

const hasVehicleWith = (req, res) => {
    let arr = [];
    if (req.query.hasOwnProperty("fuel") && req.query.hasOwnProperty("manufacturer") && req.query.hasOwnProperty("model")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.fuel === req.query.fuel && vehicle.manufacturer === req.query.manufacturer && vehicle.model === req.query.model) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }

    } else if (req.query.hasOwnProperty("fuel") && req.query.hasOwnProperty("manufacturer")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.fuel === req.query.fuel && vehicle.manufacturer === req.query.manufacturer) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }
    } else if (req.query.hasOwnProperty("fuel") && req.query.hasOwnProperty("model")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.fuel === req.query.fuel && vehicle.model === req.query.model) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }
    } else if (req.query.hasOwnProperty("manufacturer") && req.query.hasOwnProperty("model")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.manufacturer === req.query.manufacturer && vehicle.model === req.query.model) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }
    } else if (req.query.hasOwnProperty("fuel")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.fuel === req.query.fuel) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }
    } else if (req.query.hasOwnProperty("manufacturer")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.manufacturer === req.query.manufacturer) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }
    } else if (req.query.hasOwnProperty("model")) {
        for (let user of users) {
            for (let vehicle of user.vehicles) {
                if (vehicle.model === req.query.model) {
                    arr.push({ "email": user.email, "username": user.username, "img": user.img });
                    break;
                }
            }
        }
    } else {
        for (let user of users) {
            if (user.vehicles.length === 0) {
                arr.push({ "email": user.email, "username": user.username, "img": user.img });
            }
        }
    }
    res.status(200).json(arr);
}

const createUser = (req, res) => {
    const { email, firstname, lastname, username, ...rest } = req.body;
    if (!email || !firstname || !lastname || !username) {
        res.status(400).json({ message: 'Missing required fields' });
    }
    const user = {
        id: uuidv4(),
        email,
        firstname,
        lastname,
        username,
        ...rest,
    };
    res.status(201).json(user);
};

const updateUser = (req, res) => {
    for (let user of users) {
        if (user.username === req.params) {
            let { id, vehicles, favouritesFood, deleted, ...data } = req.body;
            let keys = data.keys();
            let values = data.values();
            for (let i = 0; i < data.length; i++) {
                let key = keys[i];
                let value = values[i];
                user[key] = value;
            }
            console.log(user)
            break;
        }
    }
    fs.writeFileSync(usersPath, JSON.stringify(users));
    res.status(200).send("The user has been updated");
}

const addVehicles = (req, res) => {
    if (req.body.length > 0) {
        for (let user of users) {
            if (user.username === req.params) {
                user.vehicles += req.body;
                break;
            }
        }
        fs.writeFileSync(usersPath, JSON.stringify(users));
        res.status(200).send("El usuario se ha actualizado correctamente")
    }
}

const addFoods = (req, res) => {
    if (req.body.length > 0) {
        for (let user of users) {
            if (user.username === req.params) {
                user.favouritesFood += req.body;
                break;
            }
        }
    } else {
        delete user.favouritesFood;
    }
}

const hideUser = (req, res) => {
    for (let user of users) {
        if (user.email === req.body) {
            user.deleted = true;
            break;
        }
    }
    fs.writeFileSync(usersPath, JSON.stringify(users));
    res.status(200).send("The user has been deleted");
}

module.exports = {
    getUsers,
    getUser,
    totalUsers,
    usersFrom,
    numberOfVehicles,
    favoriteFoodIs,
    hasVehicleWith,
    createUser,
    updateUser,
    addVehicles,
    addFoods,
    hideUser
}

