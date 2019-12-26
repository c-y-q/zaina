module.exports = {
    apps: [{
        name: "hbzner",
        script: "./index.js",
        watch: true,
        env_dev: {
            "PORT": 7006,
            "NODE_ENV": "dev"
        },
        env_prod: {
            "PORT": 3070,
            "NODE_ENV": "prod",
        }
    }]
}