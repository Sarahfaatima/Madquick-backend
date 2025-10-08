const mongoose = require("mongoose");

const vaultDataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    notes: {
      type: String,
    },
    // Foreign key linking to User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to your User model
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Create model
const VaultData = mongoose.model("vault-data", vaultDataSchema);

module.exports = VaultData;
