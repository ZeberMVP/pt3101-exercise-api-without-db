const fs = require('fs');
const usersPath = './db/users.json';
const { v4: uuidv4 } = require('uuid');

const usersJSON = fs.readFileSync(usersPath, 'utf8');
const users = JSON.parse(usersJSON);


const getUsers = (req, res) => {
    res.status(200).json(users);
};

const getUser = (req, res) => {
    for (let user of users) {
        if (user.username === req.params.username) {
            res.status(200).json(user);
        }
    }
};

const totalUsers = (req, res) => {
    res.status(200).json({ total: users.length });
}

const usersFrom = (req, res) => {
    let arr = [];
    for (let user of users) {
        if (user.address.country === req.params.country) {
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
        if (user.favouritesFood.includes(req.params.food)) {
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
    const { email, firstName, lastName, username, ...rest } = req.body;
    if (!email || !firstName || !lastName || !username) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = {
        id: uuidv4(),
        email,
        firstName,
        lastName,
        username,
        ...rest,
    };
    res.status(201).json(user);
};

const updateUser = (req, res) => {
    for (let user of users) {
        if (user.username === req.params.username) {
            let { id, vehicles, favouritesFood, deleted, ...data } = req.body;
            for (let key of Object.keys(data)) {
                user[key] = data[key];
            }
            console.log(user)
            break;
        }
    }
    fs.writeFileSync(usersPath, JSON.stringify(users));
    res.status(200).send("The user has been updated");
}

const addVehicles = (req, res) => {
    if (Object.keys(req.body).length > 0) {
        for (let user of users) {
            if (user.username === req.params.username) {
                user.vehicles = [...user.vehicles, ...req.body.vehicles];
                break;
            }
        }
        fs.writeFileSync(usersPath, JSON.stringify(users));
        res.status(200).send("El usuario se ha actualizado correctamente")
    }
}

const addFoods = (req, res) => {
    if (Object.keys(req.body).length > 0) {
        for (let user of users) {
            if (user.username === req.params.username) {
                user.favouritesFood = [...user.favouritesFood, ...req.body.favouritesFood];
                break;
            }
        }
    } else {
        for (let user of users) {
            if (user.username === req.params.username) {
                user.favouritesFood = [];
                break;
            }
        }
    }
    fs.writeFileSync(usersPath, JSON.stringify(users));
    res.status(200).send("El usuario se ha actualizado correctamente")
}

    const hideUser = (req, res) => {
        for (let user of users) {
            if (user.email === req.body.email) {
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

