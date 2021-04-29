const User = require('../models/UserModel');

const handleChangeAvatar = (req, res) => {
    const { avatar } = req.body;
    if (!avatar) {
        return res.status(400).json({ message: 'A new avatar url must be provided!' });
    }
    return User.findByIdAndUpdate(
        { _id: req.userID },
        { avatar },
        { new: true },
    )
        .then(() => {
            res.status(200).json({ status: 'User avatar updated!' });
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error, something went wrong.' });
        });
}

module.exports = {
    handleChangeAvatar,
};