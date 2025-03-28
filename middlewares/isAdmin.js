const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('You Have Not Permission To Access This Route');
    }
    next();
};

module.exports = isAdmin;
