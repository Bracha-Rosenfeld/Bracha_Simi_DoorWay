const {queryAllApartments,  queryApartmentById, postApartment ,putApartment, deleteApartment} = require('../service/apartmentsService');
const { getCoordinatesFromAddress } = require('../helpers/calculations');
exports.getAllApartments = async (req, res) => {
    try {
        const apartments = await queryAllApartments();
        if (!apartments || apartments.length === 0) {
            return res.status(404).json({ error: 'No apartments found' });
        }
        res.status(200).json(apartments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};

exports.getApartmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const apartment = await queryApartmentById(id);
        if (!apartment || apartment.length === 0) {
            return res.status(404).json({ error: 'Apartment with id:' + id + ' not found' });
        }
        res.status(200).json(apartment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.createApartment = async (req, res) => {
    try {
        const address = req.body.address;
        if (address === null || address === '') {
            return res.status(400).json({ error: 'Address is required' + req.body.address });
        }
        const [latitude, longitude] = await getCoordinatesFromAddress(address);
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
        }
        const apartment = await postApartment(latitude,longitude,req.body);
        if (!apartment || apartment.length === 0) {
            return res.status(404).json({ error: 'Apartment cannot be posted' });
        }
        res.status(200).json(apartment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message + req.body });
    }
}
exports.updateApartment = async (req, res) => {
    try {
        const id = req.params.id
        const isUpdate = await putApartment(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'Appartment with id:' + user.id + ' not found' });
        }
        res.status(200).json('apartment' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.removeApartment = async (req, res) => {
    try {
        const id = req.params.id;        
        const isDelete = await deleteApartment(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'Appartment with id:' + user.id + ' not found' });
        }
        res.status(200).json('apartment ' + id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}