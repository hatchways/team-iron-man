const User = require('../models/UserModel');

const handleChangeUserName = (req, res) => {
    const { id, name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'A new name must be provided!' });
    }
    return User.findByIdAndUpdate(
        { _id: id },
        { name },
        { new: true },
        function (err, result) {
            err ? res.status(400).send(err) : res.status(200).send(result);
        }
    )
}

module.exports = {
    handleChangeUserName,
};