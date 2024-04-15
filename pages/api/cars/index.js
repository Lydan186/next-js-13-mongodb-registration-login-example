import { apiHandler, carsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll,
    post: register
});

async function getAll(req, res) {
    const cars = await carsRepo.getAll();
    return res.status(200).json(cars);
}

async function register(req, res) {
    await carsRepo.create(req.body);
    return res.status(200).json({});
}