const User = require('../../../models/user');
const jwt = require('jsonwebtoken')

// create user session
module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({ message: 'Invalid username or password' });
        }

        return res.status(200).json({
            message: "Successfully signed in. Here's your token keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codial', { expiresIn: '100000' })
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}