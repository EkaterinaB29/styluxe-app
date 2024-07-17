const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export { errorHandler };
