import User from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ name });

        if (existingUser) {
            return res.status(400).json({ message: "Name is taken." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfull" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error during registration" });
    }

}