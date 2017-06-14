# 安装Go

<span id="目录"></span>

<!-- toc -->

---

## 安装Go的多种方式

* Go的三种安装方式
  - 源码安装
  - Go标准包安装
  - 第三方工具安装，如：apt-get，wget，homebrew，yum；
  - GVM，Go多版本管理工具；

[返回目录](#目录)

## Go源码安装

Go1.5彻底移除C代码，Runtime、Compiler、Linker均由Go编写，实现自举。(安装了上一个版本，即可从源码安装).

在Go1.5前，Go的源代码中，有些部分是用Plan 9 C和AT&T汇编写的，因此假如你要想从源码安装，就必须安装C的编译工具。

|系统|条件|
|-|-|
|Mac|Xcode包含了相应的编译工具|
|Unix-Like|需要安装gcc等工具，sudo apt-get install gcc libc6-dev|
Windows|安装MinGW，通过MinGW安装GCC，并设置相应的环境变量|

* 源码编译安装步骤：
  - 去[官网下载源码](https://github.com/golang/go/releases),选择相应版本；
  - 解压并且编译；

```bash 
$ wget https://codeload.github.com/golang/go/tar.gz/go1.4.2
$ tar xf go-go1.4.2.tar.gz 
$ ln -sv go-go1.4.2 golang
'golang' -> 'go-go1.4.2'
$ ls -ld golang
lrwxrwxrwx 1 kalaguiyin kalaguiyin 10 6月  14 09:02 golang -> go-go1.4.2

# 进入go源码目录进行编译；
$ cd golang/src/
~/Downloads/golang/src$ ./all.bash
# 运行all.bash后出现"ALL TESTS PASSED"字样是才算成功。
# Windows类似，只不过运行的是all.bat,调用的编译器是MinGW的gcc。
```
  - 设置环境变量，写入文件(.bashrc或.zshrc)永久有效；

```bash
export GOPATH=$HOME/Golang_Source/
export PATH=$PATH:$HOME/go/bin:$GOPATH/bin
```

使得配置文件生效：
```bash
source ~/.bashrc 或 source ~/.bashrc
bash ~/.bashrc 或 . ~/.bashrc
```

  - 从1.8开始，GOPATH环境变量就有一个默认值：
    * 在Unix-Like上的默认值为$HOME/go;
    * 在Windows上的默认值为%USERPROFILE%/go;

[返回目录](#目录)

## 二进制安装

Go提供了每个平台打包好的一键安装，默认会安装到如下目录：

* /usr/local/go(Unix-Like)
* C:\Go(Windows)

安装完成后需要设置环境变量：

```bash 
export GOROOT=$HOME/go
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
# Unix-Like 用户写入 .bashrc 或者 .zshrc 文件，Windows用户写入环境变量；
```

* 判断系统是32位还是64位：
  - Windows： Win + R运行cmd，运行systeminfo命令；
  - Unix-Like： arch 或 uname -m

[返回目录](#目录)

## Mac系统安装

下载二进制包(goVERSION.darwin-*.pkg),一路下一步，默认在PATH中增加了相应的~/go/bin ;

执行go命令验证是否安装成功；

[返回目录](#目录)

## Windows系统安装

不建议修改默认安装路径；

默认会在黄江变量PATH后添加Go安装目录下的bin目录——C:\Go\bin\,

并添加环境变量GOROOT，值为Go安装根目录C:\Go 。

[返回目录](#目录)

## 第三方安装工具

### GVM

[GVM](https://github.com/moovweb/gvm)是第三方开发的Go多版本管理工具，类似ruby里面的rvm工具；

* 安装：

```bash 
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# 或者

zsh  < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
```

[返回目录](#目录)

### GVM Requirements

#### Mac OS X Requirements

* Install Mercurial from [https://www.mercurial-scm.org/downloads](https://www.mercurial-scm.org/downloads)
* Install Xcode Command Line Tools from the App Store.

```zsh
xcode-select --install
brew update
brew install mercurial
```

#### Linux Requirements
* Debian/Ubuntu

```bash 
sudo apt-get install curl git mercurial make binutils bison gcc build-essential
```

* Redhat/Centos

```bash 
sudo yum install curl
sudo yum install git
sudo yum install make
sudo yum install bison
sudo yum install gcc
sudo yum install glibc-devel
```

  - Install Mercurial from [http://pkgs.repoforge.org/mercurial/](http://pkgs.repoforge.org/mercurial/)

#### FreeBSD Requirements

```bash
sudo pkg_add -r bash
sudo pkg_add -r git
sudo pkg_add -r mercurial
```

[返回目录](#目录)


### apt-get 

Debian系列的Linux系统上使用apt-get命令安装，同时将git和mercurial也装上：

```bash 
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:gophers/go
sudo apt-get update
sudo apt-get install golang-stable git-core mercurial
```

[返回目录](#目录)

### wget 

```bash 
wget https://storage.googleapis.com/golang/go1.8.1.linux-amd64.tar.gz
sudo tar -xzf go1.8.1.linux-amd64.tar.gz -C /usr/local
```

配置环境变量：

```bash 
$ sudo vim /etc/profile
export	GOROOT=/usr/local/go
export	GOBIN=$GOROOT/bin
export	PATH=$PATH:$GOBIN
export	GOPATH=$HOME/gopath	(可选设置)
```

重新加载profile文件：

```bash 
source	/etc/profile
```

[返回目录](#目录)

### homebrew 

homebrew是Mac系统下面目前使用最多的管理软件的工具，目前已支持Go，可以通过命令直接安装Go，为了方便，建议把git和mercurial也装上；

* 1.安装homebrew：

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/maste
r/install)"
```

* 2.安装Go
```bash 
brew update && brew upgrade
brew install go
brew install git
brew install mercurial	//可选安装
```

[返回目录](#目录)
