const Bid = require('../models/Bid.model');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {

    const query = {};
    //date start
    if(req.query.start) {
        query.date = {
            // Больше или равно
            $gte: req.query.start
        }
    }
    if(req.query.end) {
        if(!query.date) {
            query.date = {}
        }
        query.date['$lte'] = req.query.end
    }

    if(req.query.order) {
        query.order = +req.query.order
    }

    try {
        const bids = await Bid
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit);

        res.status(200).json(bids);

    } catch (e) {
        errorHandler(res, e);
    }
    res.status(200).json({
        login: 'from controller'
    })

};

module.exports.getById = async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id);
        res.status(200).json(
            bid
        );

    } catch (e) {
        errorHandler(e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Bid.remove({
            _id: req.params.id
        });
        res.status(200).json({
            message: 'Заявка была удалена'
        });

    } catch (e) {
        errorHandler(e);
    }
};

module.exports.create = async (req, res) => {
    const bid = new Bid({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : '',
        country: req.body.country,
        birthday: req.body.birthday,
        email: req.body.email,
    });

    try {
        await bid.save();
        res.status(201).json(bid);

    } catch (e) {
        errorHandler(e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name
    };

    if (req.file) {
        updated.imageSrc = req.file.path;
    }
    try {
        const bid = await Bid.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(bid);

    } catch (e) {
        errorHandler(e);
    }
};
