const customValidator = require('../validator/customValidator')
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = (req, res) => {
    console.log(req.body)
    const verify = customValidator.registerValidator(req)
    if (!verify.isValid) {
        return res.status(400).json(verify.error)
    }
    console.log('verifyed')
    userModel.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ massage: "User existing !!!" })
            }
            bcrypt.hash(req.body.password, 13, (err, hash) => {
                if (err) {
                    return res.status(500).json({ massage: "Server error !!!" })
                }
                new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    type: 'user',
                    pp: '',
                    aboutMe: ''
                }).save()
                    .then(user => {
                        res.status(200).json({ massage: 'Register successfull !!' })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({ massage: "Server error !!" })
                    })
            })
        })
}

const login = (req, res) => {
    const { email, password } = req.body
    let verify = customValidator.loginValidator(req)
    if (!verify.isValid) {
        return res.status(400).json(verify.err)
    }

    userModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ massage: "User not founded !!" })
            }
            bcrypt.compare(password, user.password, (err, success) => {
                if (err) {
                    return res.status(500).json({ massage: "Servder error occurd" })
                }
                if (!success) {
                    return res.status(400).json({ massage: "Wrong password provided!!" })
                }
                let token = jwt.sign({
                    _id: user._id,
                    type: user.type,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }, 'st_app', { expiresIn: '4h' })

                return res.status(200).json({ token: token })
            })
        })
}
const getSingleUser = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(400).json({ massage: "Bad request" })
            }
            console.log('data sent');
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(500).json({ massage: "Server error occurd " })
        })
}
const getAllUser = (req, res) => {
    userModel.find()
        .then(users => {
            res.status(200).json({ users: users })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ massage: 'server error occurd ' })
        })
}

const updateProfile = (req, res) => {
    console.log(req.body);
    if (req.body.currentPassword) {
        if (req.body.newPassword) {
            userModel.findOne({ _id: req.body.uid })
                .then(user => {
                    bcrypt.compare(req.body.currentPassword, user.password, (err, success) => {
                        if (err) {
                            return res.status(500).json({ message: "Server error occurd " })
                        }
                        if (!success) {
                            return res.status(400).json({ message: "Wrong Password Provided!" })
                        }
                        if (success) {
                            bcrypt.hash(req.body.newPassword, 13, (err, hash) => {
                                if (err) {
                                    return res.status(500).json({ message: "Server error occurd " })
                                }
                                if (hash) {
                                    user.password = hash
                                    user.name = req.body.name
                                    user.email = req.body.email
                                    user.aboutMe = req.body.aboutMe
                                    user.save()
                                        .then(updated => {
                                            console.log(updated);
                                            return res.status(200).json({ message: "Your profile successfully updated", user: updated })
                                        })
                                        .catch(err => {
                                            return res.status(500).json({ message: "Server error" })
                                        })
                                }
                            })
                        }
                    })
                })
        } else {
            return res.status(400).json({ newPassword: "For Update password New password is required" })
        }
    } else {

        userModel.findOne({ _id: req.body.uid })
            .then(user => {
                console.log(user);
                if (!user) {
                    return res.status(400).json({ massage: "Bad request" })
                }
                user.name = req.body.name
                user.email = req.body.email
                user.aboutMe = req.body.aboutMe
                user.save()
                    .then(updated => {
                        console.log(updated);
                        return res.status(200).json({ message: "Name , email and about yourself updated", user: updated })
                    })
                    .catch(err => {
                        return res.status(500).json({ message: "Server error" })
                    })
            })
            .catch(err => {
                return res.status(500).json({ massage: "Server error occurd " })
            })
    }
}
module.exports = {
    getAllUser,
    getSingleUser,
    register,
    login,
    updateProfile
}