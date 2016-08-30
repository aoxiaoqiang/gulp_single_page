## 积累样式
```
/* 单行溢出显示省略号*/
.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
```
```
/* 多行显示,溢出显示省略号*/
.multiple-ellipsis{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```

```
/* 旋转动画 */
@-webkit-keyframes rotate {
    0%,100% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}
    100% {-webkit-transform: rotate(-360deg);transform: rotate(-360deg);}
}
@keyframes rotate {
    0%,100% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}
    100% {-webkit-transform: rotate(-360deg);transform: rotate(-360deg);}
}
.rotateing {
    /*为了尽可能兼容各个浏览器*/
            -webkit-animation: rotate .8s linear infinite;
                    animation: rotate .8s linear infinite;
}
```