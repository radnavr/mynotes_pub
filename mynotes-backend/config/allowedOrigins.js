const allowedOrigins = (nodeEnv) => {
  if (nodeEnv === "production") return ["https://yoursite.com"];
  if (nodeEnv === "development")
    return [
      "https://yoursite.com",
      "http://localhost:3000",
      "http://127.0.0.1:5500",
    ];
  console.error("invalid node environment setup");
};

module.exports = allowedOrigins;
