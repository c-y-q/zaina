module.exports = {
    apps: [{
        name: "zaina",
        script: "./index.js",
        watch: true,
        env_dev: {
            "PORT": 7006,
            "NODE_ENV": "dev"
        },
        env_prod: {
            "PORT": 7003,
            "NODE_ENV": "prod",
        }
    }]
}