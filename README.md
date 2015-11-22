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
##开始编写你的代码(Coding.)
####1.  $().render(data);
##### 1>在body中放入如下代码(Add the following code in your body). See the example.html#example
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

##### 2>示例2(example2). See the example.html#example2
```html
<div id="example2">
	<h1>{{title}}</h1>
	<h2>{{subtitle}}</h2>
</div>
<script>
	var exampleData2 = {
		title:"Hello engineers!",
		subtitle:"Welcome to use this template plug-ins!"
	};
	$("#example2").render(exampleData2);
</script>
```
###### 你将会得到这样 (you will get):
```html
<div id="example2">
	<h1>Hello engineers!</h1>
	<h2>Welcome to use this template plug-ins!</h2>
</div>
```
