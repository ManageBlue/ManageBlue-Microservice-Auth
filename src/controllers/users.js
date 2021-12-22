const mongoose = require('mongoose');
const User = mongoose.model('User');


// Register new user
exports.register = (req, res) => {

    // Validate request
    if (!req.body.username  || !req.body.email || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({message: "Required data must be present"});
    }
    // TODO: check regex
    else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(req.body.email))) {
        return res.status(400).json({message: "Email address is not valid!"});
    }

    // Check lengths of fields
    if (req.body.username.length > 32 || req.body.email.length > 128 ||  req.body.firstName.length > 32 ||  req.body.lastName.length > 32) {
        return res.status(413).json({
            message: "Field too long."
        });
    }

    // Create a new user
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // Save new User in the database
    newUser
        .save(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while creating new user!"
            });
        });
};

// Return calling user data
exports.returnMe = (req, res) => {
    User.findById(req.params.tokenId, 'username firstName lastName email')
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No user with selected ID!"
                });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching user!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------

// Return a user with requested id
exports.returnByID = (req, res) => {
    User.findById(req.params.id, 'username firstName lastName email')
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No user with selected ID!"
                });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching user!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------

// Return all users
exports.returnAll = (req, res) => {
    User.find({}, '_id username firstName lastName email')
        .then(users => {
            if (!users) {
                return res.status(404).json({
                    message: "No users!"
                });
            }
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching users!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Delete user's account with the requested id in the request
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(async user => {
            if (!user) {
                return res.status(404).send({
                    message: `No user with selected ID!`
                });
            }

            res.send({message: "User deleted!"});

        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while deleting user!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Update user data of the user with requested id
exports.update = (req, res) => {

    // Check lengths of fields
    if (req.body.username && req.body.username.length > 32
        || req.body.email && req.body.email.length > 128
        || req.body.firstName && req.body.firstName.length > 32
        || req.body.lastName && req.body.lastName.length > 32) {
        return res.status(413).json({
            message: "Field too long."
        });
    }

    User.findById(req.params.id)
        .then(user => {

            if (!user) {
                return res.status(404).json({
                    message: "No user with selected ID!"
                });
            }

            // Change username
            if (req.body.username)
                user.username = req.body.username;

            // Change first name
            if (req.body.firstName)
                user.firstName = req.body.firstName;

            // Change last name
            if (req.body.lastName)
                user.lastName = req.body.lastName;

            // Change email
            if (req.body.email)
                if ((/(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(req.body.email)))
                    user.email = req.body.email;
                else
                    return res.status(400).json({message: "Email address is not valid!"});

            // Save updated user data
            user.save()
                .then(() => {
                    res.status(200).json({message: "User updated"})
                })
                .catch(error => {
                    res.status(500).send({
                        message: error.message || "An error occurred while updating user!"
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while updating user!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------
