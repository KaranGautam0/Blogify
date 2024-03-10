const { createHmac, randomBytes } = require("crypto"); // this is inbuilt packages

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    Password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/defaultProfile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// To hashed password
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("Password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.Password)
    .digest("hex");

  this.salt = salt;
  this.Password = hashedPassword;

  next();
});

// To compare hashed password
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not Found!");

  const salt = user.salt;

  const hashedPassword = user.Password;
  const userProvidedhash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedhash)
    throw new Error("Incurrect Password");

  return { ...user, password: undefined, salt: undefined };
});

const User = model("user", userSchema);
module.exports = User;
