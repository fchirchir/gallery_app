var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://user123:user123@cluster0.nnoxb.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://user123:user123@cluster0.nnoxb.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://user123:user123@cluster0.nnoxb.mongodb.net/darkroom-test?retryWrites=true&w=majority'
}
module.exports = config;
