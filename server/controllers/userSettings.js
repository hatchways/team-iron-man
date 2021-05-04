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
            res.status(400).json({ message: 'Error, something went wrong.' });
        });
}

const handleChangePassword = (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields must be filled in!' });
    }
    return User.findById({ _id: req.userID })
        .then(user => {
            const isValid = user.validatePassword(oldPassword);
            if (isValid) {
                user.password = newPassword;

                user
                    .save()
                    .then(() => res.json("User password updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            }
            else {
                return res.status(400).json({ message: 'Old password is incorrect.' });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error, something went wrong.' });
        });
}

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
    handleChangeUserName,
    handleChangePassword,
    handleChangeAvatar,
};