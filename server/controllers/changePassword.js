const User = require('../models/UserModel');

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

module.exports = {
    handleChangePassword,
};