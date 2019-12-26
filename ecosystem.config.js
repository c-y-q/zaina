module.exports = {
    apps: [{
        name: "hbzner",
        script: "./bin/www",
        watch: true,
        env_dev: {
            "PORT": 3000,
            "NODE_ENV": "dev"
        },
        env_prod: {
            "PORT": 3070,
            "NODE_ENV": "prod",
        }
    }]
}