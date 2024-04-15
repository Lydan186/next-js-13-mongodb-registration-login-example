import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';
import cars from 'pages/api/cars';

const { serverRuntimeConfig } = getConfig();
const car = db.Car;

export const carsRepo = {
    
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

/*async function authenticate({ username, password }) {
    const user = await User.findOne({ username });

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        ...user.toJSON(),
        token
    };
}*/


async function getAll() {
    return await car.find();
}

async function getById(idCar) {
    return await car.findById(idCar);
}

async function create(params) {
   if(await car.findOne({idCar: params.idCar})){
   throw 'car "' + params.idCar + '"is already taken';
}
    // validate

    const vehicle = new car(params);

    // save user
    await vehicle.save();
}

async function update(id, params) {
    const carrin = await car.findById(id);

    // validate
    if (!carrin) throw 'car not found';
    if (carrin.idCar !== params.idCar && await car.findOne({ idCar: params.idCar })) {
        throw 'el id "' + params.idCar + '" is already taken';
    }

    // copy params properties to user
    Object.assign(carrin, params);

    await carrin.save();
}

async function _delete(idCar) {
    await car.findByIdAndRemove(idCar);
}