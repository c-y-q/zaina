module.exports = {
  apps: [
    {
      name: "zaina",
      script: "./index.js",
      watch: true,
      ignore_watch: ["./logs"],
      log_date_format: "YYYY/MM/DD HH:mm:ss",
      max_memory_restart: "1G",
      error_file: `./logs/zaina-err.log`,
      out_file: `./logs/zaina-out.log`,
      log_file: `./logs/zaina-combined.log`,
      env_dev: {
        PORT: 7006,
        NODE_ENV: "dev"
      },
      env_prod: {
        PORT: 7003,
        NODE_ENV: "prod"
      }
    }
  ]
};
