const { queryAllApartments, queryAllUsersApartments, queryApartmentById, postApartment, putApartment, deleteApartment } = require('../service/apartmentsService');
const { queryUserById } = require('../service/usersService');
const { getCoordinatesFromAddress, getCityFromCoordinates } = require('../helpers/calculations');
const { sendNewApartmentEmail, sendApprovalEmail, sendApartmentDeletedEmail, sendApartmentRejectedEmail } = require('../helpers/mailer');

exports.getAllApartments = async (req, res) => {
    try {
        const isApproved = req.query.is_approved;
        const publisherId = req.query.publisher_id;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        if (isApproved == 'true') {
            const apartments = await queryAllApartments(true, limit, offset);
            return res.status(200).json(apartments);
        }
        if (isApproved == 'false') {
            const apartments = await queryAllApartments(false, limit, offset);
            return res.status(200).json(apartments);
        }
        if (publisherId) {
            const usersApartments = await queryAllUsersApartments(parseInt(publisherId));
            return res.status(200).json(usersApartments);
        }
        const apartments = await queryAllApartments(limit, offset);
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
        res.status(500).json({ error: 'Internal server error.' + error.message });
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
        const city = await getCityFromCoordinates(latitude, longitude);     
        const apartment = await postApartment(latitude, longitude, city, req.body);       
        if (!apartment || apartment.length === 0) {
            return res.status(404).json({ error: 'Apartment cannot be posted' });
        }
        const publisher = await queryUserById(apartment.publisher_id);
        if (!publisher || publisher.length === 0) {
            return res.status(404).json({ error: 'Publisher with id:' + apartment.publisher_id + ' not found' });
        }

        const emailSent = await sendNewApartmentEmail(publisher.email, publisher.username, apartment.title);
        if (!emailSent) {
            console.log('Failed to send approval email');
        } else {
            console.log('Approval email sent successfully');
        }
        res.status(200).json(apartment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}
exports.updateApartment = async (req, res) => {
    try {
        const id = req.params.id
        const isApproval = req.originalUrl.endsWith('/approve');
        const isUpdate = await putApartment(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'Appartment with id:' + user.id + ' not found' });
        }
        if (isApproval) {
            const apartment = await queryApartmentById(id);
            if (!apartment || apartment.length === 0) {
                return res.status(404).json({ error: 'Apartment with id:' + id + ' not found' });
            }
            const publisher = await queryUserById(apartment.publisher_id);
            if (!publisher || publisher.length === 0) {
                return res.status(404).json({ error: 'Publisher with id:' + apartment.publisher_id + ' not found' });
            }

            const emailSent = await sendApprovalEmail(publisher.email, publisher.username, apartment.title, apartment.type);
            if (!emailSent) {
                console.log('Failed to send approval email');
            } else {
                console.log('Approval email sent successfully');
            }
        }
        res.status(200).json('apartment' + id + ' updated');

    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}

exports.removeApartment = async (req, res) => {
    try {
        const id = req.params.id;
        const apartment = await queryApartmentById(id);
        if (!apartment || apartment.length === 0) {
            return res.status(404).json({ error: 'Apartment with id:' + id + ' not found' });
        }
        const publisher = await queryUserById(apartment.publisher_id);
        if (!publisher || publisher.length === 0) {
            return res.status(404).json({ error: 'Publisher with id:' + apartment.publisher_id + ' not found' });
        }
        const isDelete = await deleteApartment(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'Appartment with id:' + user.id + ' not found' });
        }
        await sendApartmentDeletedEmail(publisher.email, publisher.username, apartment.title);
        res.status(200).json('apartment ' + id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}

exports.rejectApartment = async (req, res) => {
    try {
        const id = req.params.id;
        const apartment = await queryApartmentById(id);
        if (!apartment) {
            return res.status(404).json({ error: 'Apartment not found' });
        }
        const publisher = await queryUserById(apartment.publisher_id);
        if (!publisher) {
            return res.status(404).json({ error: 'Publisher not found' });
        }
        await sendApartmentRejectedEmail(publisher.email, publisher.username, apartment.title);
        const deleted = await deleteApartment(id);
        if (!deleted) {
            throw new Error('Delete failed');
        }
        return res.status(200).json({ message: `Apartment ${id} rejected and deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error. ' + err.message });
    }
};
