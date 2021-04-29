const User = require('../models/UserModel');

const handleChangeUserName = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'A new name must be provided!' });
    }
    return User.findByIdAndUpdate(
        { _id: req.userID },
        { name },
        { new: true },
    )
        .then(() => {
            res.status(200).json({ status: 'User name updated!' });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
}

module.exports = {
    handleChangeUserName,
};