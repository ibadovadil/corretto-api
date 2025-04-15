const { basketValidator, Basket } = require("../../models/product/basketModel");
const { Product } = require("../../models/product/productModel");



exports.createBasket = async (req, res) => {
    try {
        // Validate request body using basketValidator
        const { error } = basketValidator(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // Find an existing basket for the user
        let basket = await Basket.findOne({ userId: req.user.id });

        if (basket) {
            // If basket exists, update or add products
            req.body.products.forEach(item => {
                const existingProduct = basket.products.find(product => product.product.toString() === item.product);
                if (existingProduct) {
                    // If the product exists in the basket, update the quantity
                    existingProduct.quantity += item.quantity;
                } else {
                    // If the product doesn't exist in the basket, add it
                    basket.products.push(item);
                }
            });
            basket.totalPrice = await calculateTotalPrice(basket.products);
            await basket.save(); // Save the updated basket
        } else {
            // If no basket exists for the user, create a new one
            const totalPrice = await calculateTotalPrice(req.body.products);
            basket = new Basket({
                userId: req.user.id,
                products: req.body.products,
                totalPrice
            });
            await basket.save();
        }

        res.status(201).json(basket);
    } catch (error) {
        res.status(500).json({ message: "Failed to create basket", error: error.message });
    }
};


exports.getBasketByUserId = async (req, res) => {
    try {
        const basket = await Basket.findOne({ userId: req.user.id }).populate({
            path: "products.product",
            select: "name price image",
        });

        if (!basket) {
            return res.status(200).json([]);
        }

        basket.products = basket.products.filter(p => p.product !== null);

        res.status(200).json(basket);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve basket", error: err.message || "Internal server error" });
    }
};


exports.updateBasket = async (req, res) => {
    try {
        const { productId, quantityChange } = req.body;
        const userId = req.user.id;

        const basket = await Basket.findOne({ userId });

        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        const productIndex = basket.products.findIndex(p => p.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in basket' });
        }
        const currentQuantity = basket.products[productIndex].quantity;
        const newQuantity = currentQuantity + quantityChange;
        if (newQuantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be less than 0' });
        }
        basket.products[productIndex].quantity = newQuantity;
        basket.totalPrice = await calculateTotalPrice(basket.products);

        await basket.save();

        res.status(200).json({ message: 'Basket updated', basket });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.getBasket = async (req, res) => {
    // try {
    //     const basket = await Basket.findOne({ userId: req.user.id }).populate('products.product');
    //     if (!basket) {
    //         return res.status(404).json({ message: 'Basket not found' });
    //     }

    //     res.status(200).json(basket);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
// };


exports.deleteBasket = async (req, res) => {
    try {
        const result = await Basket.deleteOne({ userId: req.user.id });
        if (basket.deletedCount === 0) {
            return res.status(404).json({ message: "Basket not found" });
        }
        res.status(200).json({ message: "Basket deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete basket", error: err.message });
    }
};

exports.deleteProductFromBasket = async (req, res) => {
    try {
        const { productId } = req.params;
        const basket = await Basket.findOne({ userId: req.user.id });

        if (!basket) return res.status(404).json({ message: "Basket not found" });

        const filteredProducts = basket.products.filter(
            (item) => item.product.toString() !== productId
        );

        if (filteredProducts.length === basket.products.length) {
            return res.status(404).json({ message: "Product not found in basket" });
        }

        basket.products = filteredProducts;
        basket.totalPrice = await calculateTotalPrice(filteredProducts);
        await basket.save();

        res.status(200).json({ message: "Product removed from basket", basket });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove product from basket", error: err.message });
    }
};

const calculateTotalPrice = async (products) => {
    const productIds = products.map(item => item.product);
    const productList = await Product.find({ _id: { $in: productIds } });

    let total = 0;
    for (const item of products) {
        const product = productList.find(p => p._id.toString() === item.product.toString());
        if (!product) {
            throw new Error(`Product not found: ${item.product}`);
        }
        total += item.quantity * product.price;
    }

    return total;
};