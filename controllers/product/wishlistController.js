const { Wishlist } = require("../../models/product/wishlistModel");

exports.getWishlistByUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.json([]);
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.createOrUpdateWishlist = async (req, res) => {
    try {
      const userId = req.user.id;   
      const { id } = req.params;
  
      let wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        wishlist = new Wishlist({ userId, products: [id] });
        await wishlist.save();
        return res.status(201).json({ message: "Wishlist created and product added.", wishlist });
      }
  
      if (wishlist.products.includes(id)) {
        return res.status(400).json({ message: "Product is already in the wishlist." });
      }
  
      wishlist.products.push(id);
      await wishlist.save();
  
      res.json({ message: "Product added to wishlist.", wishlist });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  };
  

  exports.removeProductFromWishlist = async (req, res) => {
    try {
      const userId = req.user.id;  
      const { id } = req.params; 
  
      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found." });
      }
  
      wishlist.products = wishlist.products.filter(
        (product) => product.toString() !== id
      );
      await wishlist.save();
  
      res.json({ message: "Product removed from wishlist.", wishlist });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  };
  
exports.deleteWishlist = async (req, res) => {
  try {
    const userId = req.user.id;   
    const result = await Wishlist.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).json({ message: "Wishlist not found." });
    }

    res.json({ message: "Wishlist successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
