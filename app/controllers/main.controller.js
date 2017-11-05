module.exports = {
    showHome: showHome
}

function showHome(req, res) {
    res.send('Hello, i am the app!');
}