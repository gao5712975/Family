# mongoose 用法
##Schema - 表结构

1.构造函数

    new mongoose.Schema( { name:{type:String}, age:{type:Number, default:10} } )

2.添加属性

    Schema.add( { name: 'String', email: 'String', age: 'Number' } )

3.有时候Schema不仅要为后面的Model和Entity提供公共的属性，还要提供公共的方法

    Schema.method( 'say', function(){console.log('hello');} ) //这样Model和Entity的实例就能使用这个方法了

4.添加静态方法

    Schema.static( 'say', function(){console.log('hello');} ) //静态方法，只限于在Model层就能使用

5.追加方法

    Schema.methods.say = function(){console.log('hello');}; //静态方法，只限于在Model层就能使用

##修改器和更新器

'$inc' 增减修改器,只对数字有效.下面的实例: 找到 age=22的文档,修改文档的age值自增1

    Model.update({'age':22}, {'$inc':{'age':1} } ); 执行后: age=23

'$set' 指定一个键的值,这个键不存在就创建它.可以是任何MondoDB支持的类型.

    Model.update({'age':22}, {'$set':{'age':'haha'} } ); 执行后: age='haha'

'$unset' 同上取反,删除一个键

    Model.update({'age':22}, {'$unset':{'age':'haha'} } ); 执行后: age键不存在
    
##数组修改器
'$push' 给一个键push一个数组成员,键不存在会创建

    Model.update({'age':22}, {'$push':{'array':10} } ); 执行后: 增加一个 array 键,类型为数组, 有一个成员 10

'$addToSet' 向数组中添加一个元素,如果存在就不添加

    Model.update({'age':22}, {'$addToSet':{'array':10} } ); 执行后: array中有10所以不会添加

'$each' 遍历数组, 和 $push 修改器配合可以插入多个值

    Model.update({'age':22}, {'$push':{'array':{'$each': [1,2,3,4,5]}} } ); 执行后: array : [10,1,2,3,4,5]

'$pop' 向数组中尾部删除一个元素

    Model.update({'age':22}, {'$pop':{'array':1} } ); 执行后: array : [10,1,2,3,4] tips: 将1改成-1可以删除数组首部元素

'$pull' 向数组中删除指定元素

    Model.update({'age':22}, {'$pull':{'array':10} } ); 执行后: array : [1,2,3,4] 匹配到array中的10后将其删除
    
##条件查询
'$lt'   小于
'$lte'  小于等于
'$gt'   大于
'$gte'  大于等于
'$ne'   不等于

    Model.find({"age":{ "$get":18 , "$lte":30 } } );

##或查询 OR

'$in'   一个键对应多个值
'$nin'  同上取反, 一个键不对应指定值
'$or'   多个条件匹配, 可以嵌套 $in 使用
'$not'  同上取反, 查询与特定模式不匹配的文档

    Model.find({"age":{ "$in":[20,21,22.'haha']} } );
    Model.find({"$or" : [ {'age':18} , {'name':'xueyou'} ] }); 查询 age等于18 或 name等于'xueyou' 的文档

##类型查询

    Model.find('age' : { '$in' : [null] , 'exists' : true } ); 查询 age值为null的文档
    
##正则表达式

    find( {"name" : /joe/i } )//查询name为 joe 的文档, 并忽略大小写
    find( {"name" : /joe?/i } ) 查询匹配各种大小写组合
    
##查询数组

    Model.find({"array":10} ); 查询 array(数组类型)键中有10的文档, array : [1,2,3,4,5,10] 会匹配到
    Model.find({"array[5]":10} ); 查询 array(数组类型)键中下标5对应的值是10, array : [1,2,3,4,5,10] 会匹配到
    
'$all' 匹配数组中多个元素
    
    Model.find({"array":[5,10]} ); 查询 匹配array数组中 既有5又有10的文档
    
'$size' 匹配数组长度

    Model.find({"array":{"$size" : 3} } ); 查询 匹配array数组长度为3 的文档
    
'$slice' 查询子集合返回

    Model.find({"array":{"$slice" : 10} } ); 查询 匹配array数组的前10个元素
    
    Model.find({"array":{"$slice" : [5,10] } } ); 查询 匹配array数组的第5个到第10个元素
    
##where

    find({'$where':function(){
        for( var x in this ){
            //这个函数中的 this 就是文档
        }
        
    }})
    
    简化：
    find( {"$where" :  "this.x + this.y === 10" } )
    find( {"$where" : " function(){ return this.x + this.y ===10; } " } )
    
    
    
#暂需框架
1.Koa
2.Bluebird

#ubuntu 安装mongodb
    开机自启动
    export PATH=$PATH:/opt/mongodb/bin
    mongod --dbpath /opt/mongodb/data/moka/ --logpath /opt/mongodb/log/mongodb.log --logappend &