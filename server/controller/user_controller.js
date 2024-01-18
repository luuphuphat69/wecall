const User = require('../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const user_controller = {
    login: async (req, res) => {
        try {
            const { Account, Password } = req.body;
            const user = await User.findOne({ Account });
            if (!user) {
                return res.status(400).json({ message: "Invalid username" });
            }
            bcrypt.compare(Password, user.Password, (err, result) => {
                if (err) {
                    return res.status(400).json({ message: "Invalid password" });
                }
                if (result) {
                    // Passwords match, authentication is successful
                    console.log('Authentication successful');
                    // Create JWT
                    const token = jwt.sign({ userId: user.UserId, userDisplayname: user.Displayname}, process.env.SECRET_KEY, {
                        expiresIn: '1h',
                    });
                    // Save token into cookies
                    res.cookie('token', token, { secure: false, maxAge: (60 * 60 * 24 * 30) * 1000, path: '/', domain: ".localhost" });
                    return res.status(201).json(token);
                } else {
                    console.log('Authentication failed');
                    return res.status(400).json({ message: "Invalid password" });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    },
    signup: async (req, res) => {
        try {
            const { Account, Password, Displayname } = req.body
            const UserId = generateUserId();
            const existingUser = await User.findOne({Account: Account});

            // Check if Account or Password is null or empty
            if (!Account || !Password) {
                return res.status(400).json({ message: 'Account or Password cannot be empty' });
            }

            // Generate a salt (a random value used for hashing)
            const saltRounds = 10; // Recommended number of salt rounds
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Hash the password with the generated salt
                bcrypt.hash(Password, salt, async (err, hash) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    if (existingUser) {
                        // If an account with the same Account exists, return an error
                        return res.status(400).json({ message: 'Account already exists' });
                    }
                    const newUser = new User({
                        UserId,
                        Account,
                        Displayname: Displayname,
                        Password: hash,
                    });
                    await newUser.save();
                    res.status(201).json({ message: 'Registration successful', Account, Password, Displayname });
                });
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getAll: async (req, res) => {
        try{
            const users = await User.find();
            res.json(users);
        }catch(err){
            console.log(err);
        }
    }
}
function generateUserId() {
    // Generate an 8-digit random number
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);

    // Concatenate the random number with 'UID' prefix
    const userId = `UID${randomNumber}`;

    return userId;
}

module.exports = user_controller;