const { promises: fs } = require("fs");
const { join, resolve } = require("path");
const faker = require("@ngneat/falso");

const createSeed = () => {
  const [, , random] = process.argv;
  let seed = 0;

  return () => {
    !random && (seed += 1);
    !random && faker.seed(seed);
  };
};

const createEntries = async (entries) => {
  const changeSeed = createSeed();

  const usersList = Array.from({ length: entries }).reduce((acc, curr) => {
    const vehiclesAmount = ~~(Math.random() * 10);
    const vehicles = [];

    for (let i = -1; ++i < vehiclesAmount; ) {
      changeSeed();

      manufacturer = faker.randVehicleManufacturer();
      model = faker.randVehicleModel();
      const car = `${manufacturer} ${model}`;

      vehicles.push({
        fuel: faker.randVehicleFuel(),
        manufacturer,
        model,
        car,
        type: faker.randVehicleType(),
      });
    }

    const foodsAmount = ~~(Math.random() * 10);
    const favouritesFood = new Set();

    for (let i = -1; ++i < foodsAmount; ) {
      changeSeed();

      favouritesFood.add(faker.randFood());
    }

    changeSeed();

    return [
      ...acc,
      {
        ...faker.randUser(),
        vehicles,
        favouritesFood: Array.from(favouritesFood),
        deleted: false,
      },
    ];
  }, []);

  await fs.writeFile(
    join(resolve("db"), "users_original.json"),
    JSON.stringify(usersList)
  );
};

(async () => {
  try {
    await createEntries(50);
    console.info("> data created! 🚀");
  } catch (error) {
    console.error("> something went wrong: ", error.message);
  }
})();
