//controller folder consist of logics and function
const test = (req, res) => {
    res.json({
        message: "API is working"
    });
};

module.exports = { test }; // Use module.exports
