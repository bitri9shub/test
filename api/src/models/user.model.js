const { default: mongoose } = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        minlength: [3, "Minimum username length is 3 characters"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    // if (!this.isModified("password")) return next() // Skip if password unchanged
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.post("save", function (payload, next) {
    console.log(`new user was created and saved ${payload}`)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

exports.userModel = mongoose.model("User", userSchema)