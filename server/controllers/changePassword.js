const User = require('../models/UserModel');

const handleChangeUserName = (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields must be filled in!' });
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