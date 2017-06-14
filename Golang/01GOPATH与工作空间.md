
# GOPATH与工作空间

<span id="目录"></span>

<!-- toc -->

---

# GOPATH与工作空间

Golang需要设置GOPATH环境变量；

Go从1.1版本到1.7必须设置GOPATH这个变量，而且不能和Go的安装目录一样；

用途：用来存放Go源码，Go的可执行文件，以及相应的编译之后的包文件；

这个目录下面有三个子目录：src、bin、pkg

从go1.8开始，GOPATH有默认值。在Unix上默认为$HOME/go,在windows上默认为%USERPROFILE%/go 。


## GOPATH设置

```bash
# Unix-Like:
$ vim ~/.bashrc
export GOPATH=$HOME/gopath
```


```bash 
# Windows新建环境变量GOPATH：
GOPATH=C:\gopath
```

* GOPATH允许多个目录，当有多个目录时，请注意分隔符：
  - Windows是分号；
  - Linux是冒号；

* 当有多个GOPATH时，默认会讲go get的内容放在第一个目录下；

* $GOPATH目录约定有三个子目录：
  - src 存放源代码(比如: .go .c .h .s等)
  - pkg 编译后生成的文件(比如: .a)
  - bin 编译后生成的可执行文件；
    为了方便，可以把此目录加入到$PATH变量中，如果有多个gopath，那么使用${GOPATH//://bin:}/bin添加所有的bin目录；


## 代码目录结构规划

GOPATH下的src目录就是接下来开发程序的主要目录，所有的源码都是放在这个目录下面，我们一般的做法是一个目录一个项目；

例如:	

$GOPATH/src/mymath 表示mymath这个应用包或者可执行应用,这个根据package是main还是其他来决定,main的话就是可执行应用,其他的话就是应用包。

所以当新建应用或者一个代码包时都是在src目录下新建一个文件夹,文件夹名称一般是代码包名称,当然也允许多级目录,例如在src下面新建了目录$GOPATH/src/github.com/astaxie/beedb	那么这个包路径就是"github.com/astaxie/beedb",包名称是最后一个目录beedb

下面我就以mymath为例来讲述如何编写应用包,执行如下代码：

```bash
[root@pythonenv src]# cat mymath/sqrt.go
//$GOPATH/src/mymath/sqrt.go源码如下：

package mymath

func Sqrt(x float64) float64 {
    z := 0.0
    for i :=0; i < 1000; i++ {
        z -= (z*z -x) / (2 * x)
    }
    return z
}
```

这样我的应用包目录和代码已经新建完毕,注意:**一般建议package的名称和目录名保持一致.**


## 编译应用

上面我们已经建立了自己的应用包，如何进行编译安装呢？有两种方式可以进行安装：

* 1、只要进入对应的应用包目录，然后执行go install，就可以安装了；
* 2、在任意的目录执行 go install mymath 

```bash
# 确认环境变量及目录结构；
[root@pythonenv src]# echo $GOPATH
/root/gopath
[root@pythonenv src]# tree $GOPATH
/root/gopath
├── bin
├── pkg
└── src
    └── mymath
        └── sqrt.go

4 directories, 1 file

# 编译包；
[root@pythonenv src]# cd $GOPATH/src/mymath
[root@pythonenv mymath]# pwd
/root/gopath/src/mymath
[root@pythonenv mymath]# go install
```

安装完成后，我们可以进入如下目录：

cd	$GOPATH/pkg/${GOOS}_${GOARCH}

可以看到编译生成的包文件；

```bash
[root@pythonenv mymath]# tree /root/gopath/
/root/gopath/
├── bin
├── pkg
│   └── linux_amd64
│       └── mymath.a   # 应用包文件；被调用；
└── src
    └── mymath
        └── sqrt.go

5 directories, 2 files
```

这个.a文件是应用包,那么我们如何进行调用呢?
接下来我们新建一个应用程序来调用这个应用包
新建应用包mathapp

```bash
[root@pythonenv mymath]# cd $GOPATH/src
[root@pythonenv src]# mkdir mathapp
[root@pythonenv src]# cd mathapp
[root@pythonenv mathapp]# vim main.go
[root@pythonenv mathapp]# cat main.go
# $GOPATH/src/mathapp/main.go源码：

package main

import (
    "mymath"
    "fmt"
)

func main() {
    fmt.Printf("Hello,World. Sqrt(2) = %v\n",mymath.Sqrt(2))
}
```

在这个文件中：

package是main，import里面调用的是mymath，这个就是相对于$GOPATH/src的路径；

如果是多级目录，就在import里面引入多级目录；

如果你有多个GOPATH，也是一样，Go会自动在多个$GOPATH/src中寻找。

* 如何编译？

```bash
# 切换目录到源代码所在路径：
[root@pythonenv mathapp]# cd $GOPATH/src/mathapp
[root@pythonenv mathapp]# ls
main.go
[root@pythonenv mathapp]# go build
[root@pythonenv mathapp]# ls
main.go  mathapp
# 编译生成可执行文件：mathapp
[root@pythonenv mathapp]# ./mathapp 
Hello,World. Sqrt(2) = 1.414213562373095
[root@pythonenv mathapp]# ls $GOPATH/bin/
# go install 则可以将编译生成的可执行文件安装到$GOPATH/bin目录下；
[root@pythonenv mathapp]# go install
[root@pythonenv mathapp]# ls $GOPATH/bin/
mathapp
```

## 获取远程包

go语言有一个获取远程包的工具就是 	go	get	 ,目前go	get支持多数开源社区(例如:github、googlecode、bitbucket、Launchpad)

```bash 
go get github.com/astaxie/beedb
```

go get -u 参数可以自动更新包，而且当go get的时候会自动获取该包依赖的其他第三方包。

通过这个命令可以获取相应的源码,对应的开源平台采用不同的源码控制工具,例如github采用git、
googlecode采用hg,所以要想获取这些源码,必须先安装相应的源码控制工具。

