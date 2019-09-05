module.exports = {
    resJson: (...args) => {
        return args[0].status(args[1]).json(args[2]);
    }
}