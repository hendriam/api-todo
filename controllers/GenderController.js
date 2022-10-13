const Gender = require("../models/Gender.js");
const moment = require("moment");

exports.getAll = async (req, res) => {
    let _data = await getGender();
    let stat = {
        message: "oke",
        data: _data,
    };

    console.log(`[Gender] get data successfull => ${JSON.stringify(_data)}`);
    return res.status(200).send(stat);
};

exports.getOne = async (req, res) => {
    let _data = await getOneGender(req.params.id);

    // if data null send this response
    if (_data == null) {
        return res.status(404).send({
            message: `not found`,
            data: null,
        });
    }

    let stat = {
        message: "oke",
        data: _data,
    };
    console.log(`[Gender] get data successfull => ${JSON.stringify(_data)}`);
    return res.status(200).send(stat);
};

exports.create = async (req, res) => {
    let data = {
        name: req.body.name,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    // check name is already ?
    let checkName = await _checkName(data.name);
    if (checkName != null) {
        return res.status(422).send({
            message: `name is already, please change name`,
            data: null,
        });
    }

    let created = await createGender(data);
    if (created == "ERROR") {
        return res.status(422).send({
            message: `create failed`,
            data: null,
        });
    }
    console.log(`create gender success ${JSON.stringify(created)}`);

    return res.status(200).send({
        message: "create success",
        data: created,
    });
};

exports.update = async (req, res) => {
    let data = {
        name: req.body.name,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    let updated = await updateGender(req.params.id, data);
    if (updated == "ERROR") {
        return res.status(422).send({
            message: `update failed`,
            data: null,
        });
    }
    console.log(`update gender success ${JSON.stringify(updated)}`);

    return res.status(200).send({
        message: "update success",
        data: updated,
    });
};

exports.delete = async (req, res) => {
    let deleted = await deleteGender(req.params.id);
    if (deleted == "ERROR") {
        return res.status(422).send({
            message: `delete failed`,
            data: null,
        });
    }
    console.log(`delete gender success ${JSON.stringify(deleted)}`);

    return res.status(200).send({
        message: "delete success",
        data: deleted,
    });
};

function getGender() {
    return new Promise(function (resolve, reject) {
        Gender.find()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function getOneGender(_id) {
    return new Promise(function (resolve, reject) {
        Gender.findOne({ _id: _id })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function _checkName(_name) {
    return new Promise(function (resolve, reject) {
        Gender.findOne({ name: _name })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function createGender(_data) {
    return new Promise(function (resolve, reject) {
        const saveGender = new Gender(_data);
        saveGender
            .save()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function updateGender(_id, _data) {
    return new Promise(function (resolve, reject) {
        Gender.findByIdAndUpdate(_id, _data, {
            new: true,
        })
            .then((_data) => {
                resolve(_data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function deleteGender(_id) {
    return new Promise(function (resolve, reject) {
        Gender.findByIdAndRemove(_id)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}
