module.exports = {
    resJson: (...args) => {
        let arr = [];
        args.map(item => {
            arr.push(item);
        })

        return arr[0].status(arr[1]).json(arr[2]);
    }
}