#yirua
A mini and ease-to-use templating plugin for `jQuery` or `Zepto`.<br>
一个基于jQuery或者Zepto的模板框架的插件。压缩后只有3kb
<br>
<br>

##准备工作(Prepare.)
####1.引入JQuery或者Zepto文件。(Link jQuery or Zepto to html file.)
```html
<script src="jquery.min.js"></script>
```
Or
```html
<script src="zepto.min.js"></script>
```


####2.引入jquery.yirua.js(Link jquery.yirua.js to html file.)。
```html
<script src="jquery.yirua.min.js"></script>
```

####3.你现在获得类似这样的文件。
```html
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    	<title>yirua模版框架</title>
		<script src="jquery.min.js"></script>
		<!--<script src="zepto.min.js"></script>--><!-- 你也可以考虑用这个框架 -->
		<script src="jquery.yirua.min.js"></script>
	</head>
	<body>
		<script>
			
		</script>
	</body>
</html>
```

<br>
##开始编写你的代码(Starting.)
####1.  $().render(data);
##### 在body中放入如下代码
```html
<h1 id="example1">{{message}}</h1>
<script>
	$("#example1").render({message:"Hello World!"});
</script>
```
###### 你将会得到这样 (you will get):
```html
<h1>Hello World!</ht>
```

