import { apiHandler, carsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const car = await carsRepo.getById(req.query.id);

    if (!car) throw 'Car Not Found';

    return res.status(200).json(car);
}

async function update(req, res) {
    await carsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await carsRepo.delete(req.query.id);
    return res.status(200).json({});
}