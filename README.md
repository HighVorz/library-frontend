#### Code Guide
Use emoji in your comments

emoji	English	Chinese
💩	garbage code	垃圾代码
🚩	waiting complete	待处理
❌	error	错误, 无法运行等
🐞	bug	漏洞
💀	danger code	危险代码
⚠️	warning	警告
📐	uncheck	未测试
🔧	in experiment	维护中
⭐	important	重要
✒️	editable	允许修改
❓	can't understand the code	无法理解


#### Change
- 弃用json-server, 改用mirageJs


#### Vue 3 databinding

我们希望展示一个BookList
那么根据js的对象(类似于字典)语法

``` js
const BookList = [
    {},
    {},
]
```

将数据BookList放在\<script>区, 如下

注意: 统一用Vue3语法 \<script>区域格式为
``` js
<script setup>

    // data
    // 原本需要写data(), 现在不需要了
    // components 也不需要写
    const BookList = ref([
        {bookname: "哈利波特"},
        {bookname: "三国演义"},
    ])

    // 函数
    function setBookList(){
        // 想要在函数中修改, 需要用.value
        BookList.value = [
            {bookname: "红楼梦"}
        ]
    };
</script>
```



在template区用绑定语法即可, 具体可参考userspace.vue中的代码

``` html
<template>
   <tr v-for="book in BookList   " :key="record.id">
        <td>《{{ book.bookname }}》</td>
    </tr>
</template>
```


总的来说, 需要写的包括

``` js
// script 区
const age = ref(32)

function setAge(){
    age.value = 18
}
```

template区
``` html
    <button @click="setAge">age</div>
```



#### 进度

login 完毕
