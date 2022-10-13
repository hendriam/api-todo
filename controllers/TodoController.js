const Todo = require("../models/Todo.js");
const moment = require("moment");

exports.getAll = async (req, res) => {
    let _data = await getTodo();
    let stat = {
        message: "oke",
        data: _data,
    };

    console.log(`get data successfully => ${JSON.stringify(_data)}`);
    return res.status(200).send(stat);
};

exports.getOne = async (req, res) => {
    let _data = await getOneTodo(req.params.id);

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

    console.log(`get data successfull => ${JSON.stringify(_data)}`);
    return res.status(200).send(stat);
};

exports.create = async (req, res) => {
    let data = {
        name: req.body.name,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    let created = await createTodo(data);
    if (created == "ERROR") {
        return res.status(422).send({
            message: `create failed`,
            data: null,
        });
    }

    console.log(`create success ${JSON.stringify(created)}`);
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

    let updated = await updateTodo(req.params.id, data);
    if (updated == "ERROR") {
        return res.status(422).send({
            message: `update failed`,
            data: null,
        });
    }

    console.log(`update success ${JSON.stringify(updated)}`);
    return res.status(200).send({
        message: "update success",
        data: updated,
    });
};

exports.delete = async (req, res) => {
    let deleted = await deleteTodo(req.params.id);
    if (deleted == "ERROR") {
        return res.status(422).send({
            message: `delete failed`,
            data: null,
        });
    }

    console.log(`delete success ${JSON.stringify(deleted)}`);
    return res.status(200).send({
        message: "delete success",
        data: deleted,
    });
};

function getTodo() {
    return new Promise(function (resolve, reject) {
        Todo.find()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function getOneTodo(_id) {
    return new Promise(function (resolve, reject) {
        Todo.findOne({ _id: _id })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function createTodo(_data) {
    return new Promise(function (resolve, reject) {
        const saved = new Todo(_data);
        saved
            .save()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function updateTodo(_id, _data) {
    return new Promise(function (resolve, reject) {
        Todo.findByIdAndUpdate(_id, _data, {
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

function deleteTodo(_id) {
    return new Promise(function (resolve, reject) {
        Todo.findByIdAndRemove(_id)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}
