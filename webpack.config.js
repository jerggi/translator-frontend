// const nodeEnv = process.env.NODE_ENV || 'development';
// const isProd = nodeEnv === 'production';

module.exports = {
   entry: './main.js',
	
   output: {
      path:'/',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 3003,
      hot: true,
      proxy: [
            {
                context: ['/api'],
                // target: 'https://dashboard.virtub.io',
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true
            }
        ]
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}
