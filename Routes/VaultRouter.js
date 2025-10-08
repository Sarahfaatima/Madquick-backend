const ensureAuthenticated = require('../Middlewares/Auth');
const Vault = require('../Models/vault-data');

const router = require('express').Router();

// Save or Edit vault data
router.post("/save-data", ensureAuthenticated, async (req, res) => {
  try {
    const { _id, title, username, password, url, notes } = req.body;

    // user id from authentication middleware
    const userId = req.user._id;

    let vaultItem;

    if (_id) {
      // Edit existing item
      vaultItem = await Vault.findOneAndUpdate(
        { _id, userId }, // ensure only the owner can update
        { title, username, password, url, notes },
        { new: true } // return the updated document
      );

      if (!vaultItem) {
        return res.status(404).json({ success: false, message: "Vault item not found" });
      }
    } else {
      // Create new vault item
      vaultItem = new Vault({ userId, title, username, password, url, notes });
      await vaultItem.save();
    }

    res.status(200).json({ success: true, data: vaultItem });
  } catch (error) {
    console.error("Error saving vault data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete('/delete', ensureAuthenticated, async (req, res) => {
  try {
    const vaultId = req.query.id;

    // Delete the vault item belonging to the logged-in user
    const deletedItem = await Vault.findOneAndDelete({
      _id: vaultId,
      userId: req.user._id, // req.user is set by ensureAuthenticated middleware
    });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Vault item not found or unauthorized' });
    }

    res.status(200).json({ message: 'Vault item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting vault item' });
  }
});


// Get all vault items for logged-in user
router.get("/fetch-data", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // req.user is set by ensureAuthenticated middleware
    const vaultItems = await Vault.find({ userId: userId });
    res.json(vaultItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching vault items" });
  }
});


module.exports = router;
