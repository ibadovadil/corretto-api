const staticToken = (req, res, next) => {
    try {
        const token = process.env.STATIC_TOKEN;
        const incomingToken = req.headers[`${process.env.STATIC_KEY}`];

        if (
            !Object.keys(req.headers).includes(`${process.env.STATIC_KEY}`) || !incomingToken || incomingToken !== token
        ) {
            return res.status(401).send('no access');
        }

        next();
    } catch (err) {
        console.error(`Error in staticToken middleware: ${err.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
