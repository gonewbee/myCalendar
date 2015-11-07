## 搭建开发环境

+ 安装react，在myCalendar目录下

	npm install --save react react-dom babelify babel-preset-react --registry https://registry.npm.taobao.org

+ 安装webpack

	npm install webpack -g --registry https://registry.npm.taobao.org

+ 安装jsx-loader

	npm install --save-dev jsx-loader


## webpack打包
编写webpack.config.js，将jsx打包为js

## sass

	sass scss/style.scss css/style.css

SASS监听某个目录
	
	sass --watch scss:css

## 使用babel
也可以不使用webpack打包，安装babel

	npm install --global babel-cli --registry https://registry.npm.taobao.org
	npm install babel-preset-react --registry https://registry.npm.taobao.org
转换jsx到js

	babel --presets react jsx\index.jsx --out-file js\index.js
	
监听变化

	babel --presets react jsx --watch --out-dir js

	
