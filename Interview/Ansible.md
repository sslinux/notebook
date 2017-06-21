# Ansible
<!-- toc --> 

## Ansible官方资源
* [Ansible Documentation](http://docs.ansible.com/)
* [Ansible Github](https://github.com/ansible/ansible/)
* [Ansible中文权威指南](http://www.ansible.com.cn/)


## Ansible特性

* 模块化：调用特定的模块，完成特定的任务；
* 基于Python语言研发，由Paramikko，PyYAML和Jinja2三个核心库实现；
* 部署简单：agentless；
* 支持自定义模块，使用任意编程语言；
* 强大的playbook机制；
* 幂等性；

## 安装及程序环境

### 程序
* ansible
* ansible-playbook
* ansible-doc

### 配置文件
* /etc/ansible/ansible.cfg

### 主机清单
* /etc/ansible/hosts

### 插件目录
* /usr/share/ansible_plugins/

### 安装ansible
* yum install ansible -y 

## ansible命令的使用

### Usage: ansible <host-pattern> [options]

#### 常用选项：
* -m MOD_NAME  默认的MOD_NAME 是command；
* -a MOD_ARGS


## 配置Host Inventory

### /etc/ansible/hosts
* HOST_PATTERN1
* HOST_PATTERN2

#### 添加两台主机做测试用
```bash
[root@falcon ansible]# cat hosts
[falcon]
172.27.2.79
172.27.2.88
```

## SSH免密码登录设置

### 生成私钥和公钥

```bash 
[root@falcon ~]# ssh-keygen -b 4096 -t rsa -P ''
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
d0:1e:00:12:68:7d:d1:2d:2d:a1:e2:91:c2:79:ef:00 root@falcon.symbio.com
The key s randomart image is:
+--[ RSA 4096]----+
| .+..o+.+        |
|o..o...* o       |
|.E =... =        |
|  = +  o .       |
|   o .  S        |
|    o            |
|     .           |
|                 |
|                 |
+-----------------+
[root@falcon ~]# ls ~/.ssh/
authorized_keys  id_rsa  id_rsa.pub  known_hosts
```

### 复制公钥文件为authorized_keys

```bash
[root@falcon ~]# cd ~/.ssh/
[root@falcon .ssh]# ls
authorized_keys  id_rsa  id_rsa.pub  known_hosts

[root@falcon .ssh]# cat id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCsB35DoT7JF2ARqsyGib0oYSDR3EGbW0PleHPDQEnhlxpth35Pmg8dbpyGpoQwO8EqdGVy0N+O/rGhJ1QYO+kG9oNuDfzec8E0ANqNznNZpGgX8me3JQ2GRgMBOUVFg1wiVuhxE3Ww2pIZC2NhSz8LNtpSHlTEWwJ6uHhP9MUiAdxrk3uHGPj+KgnkaSiYOH7pD3HBVEKC8ywJsAEwBJCYz/1P86HMBRC8bcrL8x9FasCx+WObJYWVQs1urhw4XNHtbVZqFgeVtmgnpZuQr4SuARJQEPQ/NAaAdIPdYGph6jJop0wKHP2WhwIBbf9FX34FAWJZnD49FCtn5RAflukXlY7gJBxoStAApzjkxy48r8mU4kxufXXMcgf68r/W+YSMdD4BGpdgJBQiPssBvF3/H+6RD6EE51CrOH2slUitMLi2F7iCWZetteqfBYXR5YIA8H4V4dG3GPNzVTW0U0vhFagpA9T0vGhciWr9P0CgvSzRTQO4YlkKLXJfoiQWZBTsEHmttgxDfCQ1w6hoNTz8sMXGtsQvrkC35nR+mNFISKmrAH3jaJ2bgDT6PqgG/OGdI8u1GDjnKSNA96SnWjwEjTfDnGwN2LAp2GNRA8A+ACJBCN3vZRg0inmWQdeahIDJ/tUklVoLRdOHUd4iowWIUwHGvIwvLfh8AWIkT9fWxw== root@falcon.symbio.com

[root@falcon .ssh]# cat id_rsa.pub >> authorized_keys 
[root@falcon .ssh]# chmod 600 authorized_keys 
[root@falcon .ssh]# ll authorized_keys 
-rw-------. 1 root root 1156 6月  21 16:12 authorized_keys

[root@falcon .ssh]# cat authorized_keys 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCqjaWO8MLMPSGfiVWS8z7z7Jb00E8A+BLiIA8mzEN0n4pcw6coUWEcSHEEM27kC920NiQMvO6uTFtTUP4a1mJxP6P+AmV/989H92naJXnjb6X8IPh3KOhSX0a619lg4hDPr0qiGz2Tx9go7hoAp5ZMOoa6jYVzjJrKRQdNcN8xD7jFJ7SdxXbOWwECJse1InJ4j+gQzs635dgS129X6x6lirxt3t9wuuo9VkgL52nPd1rsXjQCxmuGUw7chZhS0n6Wj1p1Tu5SdF0z9Tk83NIuVRsBgI7ctfy6FUQTjHgg87tdE7dL9ovFTk49cF8qNHKUnhsguOIL3rVXMwr/XptH root@localhost.localdomain
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCsB35DoT7JF2ARqsyGib0oYSDR3EGbW0PleHPDQEnhlxpth35Pmg8dbpyGpoQwO8EqdGVy0N+O/rGhJ1QYO+kG9oNuDfzec8E0ANqNznNZpGgX8me3JQ2GRgMBOUVFg1wiVuhxE3Ww2pIZC2NhSz8LNtpSHlTEWwJ6uHhP9MUiAdxrk3uHGPj+KgnkaSiYOH7pD3HBVEKC8ywJsAEwBJCYz/1P86HMBRC8bcrL8x9FasCx+WObJYWVQs1urhw4XNHtbVZqFgeVtmgnpZuQr4SuARJQEPQ/NAaAdIPdYGph6jJop0wKHP2WhwIBbf9FX34FAWJZnD49FCtn5RAflukXlY7gJBxoStAApzjkxy48r8mU4kxufXXMcgf68r/W+YSMdD4BGpdgJBQiPssBvF3/H+6RD6EE51CrOH2slUitMLi2F7iCWZetteqfBYXR5YIA8H4V4dG3GPNzVTW0U0vhFagpA9T0vGhciWr9P0CgvSzRTQO4YlkKLXJfoiQWZBTsEHmttgxDfCQ1w6hoNTz8sMXGtsQvrkC35nR+mNFISKmrAH3jaJ2bgDT6PqgG/OGdI8u1GDjnKSNA96SnWjwEjTfDnGwN2LAp2GNRA8A+ACJBCN3vZRg0inmWQdeahIDJ/tUklVoLRdOHUd4iowWIUwHGvIwvLfh8AWIkT9fWxw== root@falcon.symbio.com
```

### 把公钥传送到其他主机

```bash
[root@falcon .ssh]# scp authorized_keys 172.27.2.88:/root/.ssh/
root@172.27.2.88's password: 
authorized_keys                               100% 1156     1.1KB/s   00:00   
```

### 在被控制端主机查看密钥并确认其权限

```bash
[root@falcon .ssh]# ssh root@172.27.2.88
Last login: Wed Jun 21 14:40:32 2017 from 172.27.8.23
[root@pythonenv ~]# ls -l ~/.ssh/authorized_keys 
-rw-------. 1 root root 1156 6月  21 16:15 /root/.ssh/authorized_keys
```

### 使用ansible的ping模块测试两台主机的连通性
```bash
[root@falcon ansible]# ansible falcon -m ping
172.27.2.79 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}
172.27.2.88 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}
```

### 同步主机之间的时间以免造成日志混乱

```bash
[root@falcon ansible]# ansible falcon -a "ntpdate 10.60.4.180"
172.27.2.79 | SUCCESS | rc=0 >>
21 Jun 16:34:34 ntpdate[17103]: step time server 10.60.4.180 offset 18.504664 sec

172.27.2.88 | SUCCESS | rc=0 >>
21 Jun 16:34:34 ntpdate[13776]: step time server 10.60.4.180 offset -10.289925 sec
```


## ansible模块

### 获取模块列表

```bash
[root@falcon ansible]# ansible-doc -l
```

### 获取指定模块的使用帮助

#### ansible-doc -s MOD_NAME
```bash
[root@falcon ansible]# ansible-doc -s user
```

### 常用模块

#### ping模块：探测目标主机是否存活；
#### command模块：在远程主机执行命令，是Ansible的默认模块；
#### shell模块：在远程主机上调用shell解释器运行命令，支持shell的各种特性，例如管道、重定向等；

---
#### 注意：command和shell模块的核心参数直接为命令本身；而其他模块的参数通常为"key=value"格式；
---

#### copy模块：复制文件到远程主机
* 1.复制文件：

-a "src='#' '' "

```bash
[root@falcon ~]# cat anaconda-ks.cfg >> ./copy_module_test.txt
[root@falcon ~]# ansible falcon -m copy -a "src='copy_module_test.txt' dest='/root/'"

[root@falcon ~]# ansible falcon -m command -a "ls -lh /root/copy_module_test.txt"
172.27.2.79 | SUCCESS | rc=0 >>
-rw-r--r--. 1 root root 1.3K 6月  21 16:53 /root/copy_module_test.txt

172.27.2.88 | SUCCESS | rc=0 >>
-rw-r--r--. 1 root root 1.3K 6月  21 16:54 /root/copy_module_test.txt
```

* 2.给定内容生成文件：

-a "content= dest= "

```bash
[root@falcon ~]# ansible falcon -m copy -a "content='This is a test conten for copy module' dest='/root/content.txt'"

[root@falcon ~]# ansible falcon -m command -a "cat /root/content.txt"
172.27.2.79 | SUCCESS | rc=0 >>
This is a test conten for copy module

172.27.2.88 | SUCCESS | rc=0 >>
This is a test conten for copy module
```
如果要传送文件，该主机的指定目录需要存在,否则会报错；

#### file模块：设置文件的属性
* 1.创建目录：

-a "path= state=directory"

* 2.创建链接文件：

-a "path= src='#' " /p>

* 3.删除文件：

-a "path= state=absent"


#### fetch模块：从远程主机拿文件

```bash 
[root@falcon ~]# ansible 172.27.2.88 -m fetch -a "src=/root/anaconda-ks.cfg dest=/root/anaconda_from_88.cfg"
172.27.2.88 | SUCCESS => {
    "changed": true, 
    "checksum": "1f02d8a0524f7e32cd612c2a54c576bb93bddb4e", 
    "dest": "/root/anaconda_from_88.cfg/172.27.2.88/root/anaconda-ks.cfg", 
    "md5sum": "9692f1d9a8808495a1d8514e3ec36c21", 
    "remote_checksum": "1f02d8a0524f7e32cd612c2a54c576bb93bddb4e", 
    "remote_md5sum": null
}
[root@falcon ~]# ls -lh anaconda_from_88.cfg/172.27.2.88/root/anaconda-ks.cfg 
-rw-------. 1 root root 1.7K 6月  21 17:49 anaconda_from_88.cfg/172.27.2.88/root/anaconda-ks.cfg
```

**给定的dest应该是一个目录，fetch模块会在该目录下根据主机进行区分；**


#### cron模块：管理计划任务条目；

* 确定时间：
  - minute=
  - hour=
  - day=
  - month=
  -weekday=

* job='要执行的命令'
* name='给这个任务取个名字，后期删除的时候可以用'
* user='USERNAME'   指定为某个用户的计划任务；
* state={present|absent},present为添加，absent为删除；

#### hostname模块：管理主机名
#### yum模块：使用yum命令完成程序包管理
* state: install (`present' or `installed', `latest')；
* state: remove (`absent' or `removed');
* name: Package Name；

#### service模块：服务管理
* name="Service Name"
* state="{started | stopped | restarted}"
* enabled="{yes | no}"
* runlevel= 仅对于init script而言；


#### group模块：增加或删除组
#### user模块：用户管理
#### setup模块：收集主机里面的各种信息



