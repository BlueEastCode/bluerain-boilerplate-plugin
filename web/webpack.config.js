module.exports = function (config, mode) {
    config.module.loaders.push({
      test: /\.css/,
      loaders: ["style-loader","css-loader"]
    });
    config.module.loaders.push({
      test: /\.(woff|woff2)$/,
      loader:
        "url-loader?prefix=fonts/&limit=8000&mimetype=application/font-woff"
    });
    config.module.loaders.push({
      test: /\.ttf$/,
      loader: "file-loader?prefix=fonts/"
    });
    config.module.loaders.push({
      test: /\.eot$/,
      loader: "file-loader?prefix=fonts/"
    });
    config.module.loaders.push({
      test: /\.svg/,
      loader: "file-loader"
    });
    return config;
  }