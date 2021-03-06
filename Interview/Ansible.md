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

### Usage: ansible host-pattern [options]

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
  - weekday=

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

---

## YAML

YAML是一种数据序列化工具的语言格式；

```bash
[root@falcon ~]# yum info PyYAML
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: centos.uhost.hk
 * extras: centos.uhost.hk
 * updates: mirror.vpshosting.com.hk
Installed Packages
Name        : PyYAML
Arch        : x86_64
Version     : 3.10
Release     : 11.el7
Size        : 630 k
Repo        : installed
From repo   : base
Summary     : YAML parser and emitter for Python
URL         : http://pyyaml.org/
License     : MIT
Description : YAML is a data serialization format designed for human readability and
            : interaction with scripting languages.  PyYAML is a YAML parser and
            : emitter for Python.
            : 
            : PyYAML features a complete YAML 1.1 parser, Unicode support, pickle
            : support, capable extension API, and sensible error messages.  PyYAML
            : supports standard YAML tags and provides Python-specific tags that
            : allow to represent an arbitrary Python object.
            : 
            : PyYAML is applicable for a broad range of tasks from complex
            : configuration files to object serialization and persistance.
```

## 数据结构

key:value 

- -item1
- -item2
- -item3

例如： {name:jason,age:21}


## playbook

## 核心元素
* Tasks:任务，由模块定义的操作的列表；
* Variables:变量；
* Templates:模板，即使用了模板语法的文本文件；
* Handlers: 有特定条件触发的Tasks；
* Roles:角色；

## playbook的基础组件
* Hosts:运行指定任务的目标主机；
* remote_user: 在远程主机上以那个身份执行；
* sudo_user: 非管理员需要拥有sudo权限；
* tasks: 任务列表；

## playbook格式
* (1) action: module arguments
* (2) module: arguments

## ansible-playbook命令

* (1) 检测语法

ansible-playbook --syntax-check /path/to/playbook.yaml

* (2) 测试运行

ansible-playbook -C /path/to/playbook.yaml

--list-hosts

--list-tasks

--list-tags

(3) 运行

ansible-playbook /path/to/playbook.yaml

-t TAGS, --tags=TAGS

--skip-tags=SKIP_TAGS

--start-at-task=START_AT


----

Example 1: 定义一个playbook任务来新增用户和组，定义一个yaml的模板；

```bash
[root@falcon ansible]# vim group.yaml
[root@falcon ansible]# cat group.yaml 
```
```yaml
- hosts: falcon
  remote_user: root
  tasks:
  - name: add a group
    group: name=pbgroup system=true
  - name: add a user
    user: name=pbuser group=pbgroup system=true
```

查查语法有没有错误，没有提示即表示语法应该没有问题。
```bash
[root@falcon ansible]# ansible-playbook --syntax-check group.yaml 

playbook: group.yaml
```

测试运行看看，-C表示仅测试跑一边，但是不会实际操作:
```bash
[root@falcon ansible]# ansible-playbook -C group.yaml 

PLAY [falcon] *****************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [add a group] ************************************************************************************************************************************************************************************************
changed: [172.27.2.79]
changed: [172.27.2.88]

TASK [add a user] *************************************************************************************************************************************************************************************************
changed: [172.27.2.79]
changed: [172.27.2.88]

PLAY RECAP ********************************************************************************************************************************************************************************************************
172.27.2.79                : ok=3    changed=2    unreachable=0    failed=0   
172.27.2.88                : ok=3    changed=2    unreachable=0    failed=0   
```

也可以单独测试某些特定的选项：

* 仅查看影响的主机：

```bash
[root@falcon ansible]# ansible-playbook -C group.yaml --list-hosts

playbook: group.yaml

  play #1 (falcon): falcon	TAGS: []
    pattern: [u'falcon']
    hosts (2):
      172.27.2.79
      172.27.2.88
```

* 查看运行哪些任务：

```bash 
[root@falcon ansible]# ansible-playbook -C group.yaml --list-tasks

playbook: group.yaml

  play #1 (falcon): falcon	TAGS: []
    tasks:
      add a group	TAGS: []
      add a user	TAGS: []
```

* 查看哪个任务打标了，这里并没有任何任务打标记：

```bash 
[root@falcon ansible]# ansible-playbook -C group.yaml --list-tags

playbook: group.yaml

  play #1 (falcon): falcon	TAGS: []
      TASK TAGS: []
```


* 正式运行该任务：

```bash
[root@falcon ansible]# ansible-playbook group.yaml 

PLAY [falcon] *****************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [add a group] ************************************************************************************************************************************************************************************************
changed: [172.27.2.79]
changed: [172.27.2.88]

TASK [add a user] *************************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

PLAY RECAP ********************************************************************************************************************************************************************************************************
172.27.2.79                : ok=3    changed=2    unreachable=0    failed=0   
172.27.2.88                : ok=3    changed=2    unreachable=0    failed=0   
```

* 验证执行效果：

```bash
[root@falcon ansible]# ansible falcon -a "tail -1 /etc/passwd"
172.27.2.79 | SUCCESS | rc=0 >>
pbuser:x:995:993::/home/pbuser:/bin/bash

172.27.2.88 | SUCCESS | rc=0 >>
pbuser:x:987:984::/home/pbuser:/bin/bash

[root@falcon ansible]# ansible falcon -a "getent group pbgroup"
172.27.2.88 | SUCCESS | rc=0 >>
pbgroup:x:984:

172.27.2.79 | SUCCESS | rc=0 >>
pbgroup:x:993:
```

----

Example 2: 定义一个playbook任务来修改配置文件中的监听端口；

```bash 
[root@falcon ansible]# cat httpd.yaml
- hosts: falcon 
  remote_user: root
  tasks:
  - name: install httpd package
    yum: name=httpd state=latest
  - name: backup apache conf file
    shell: cp /etc/httpd/conf/httpd.conf{,.bak}
  - name: install conf file
    copy: src=/root/ansible/httpd.conf dest=/etc/httpd/conf/httpd.conf
  - name: start httpd service
    service: name=httpd state=started enabled=yes
[root@falcon ansible]# ansible-playbook --syntax-check httpd.yaml 

playbook: httpd.yaml
```

* 执行playbook

```bash 
[root@falcon ansible]# ansible-playbook httpd.yaml 

PLAY [falcon] *****************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [install httpd package] **************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [backup apache conf file] ************************************************************************************************************************************************************************************
changed: [172.27.2.79]
changed: [172.27.2.88]

TASK [install conf file] ******************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

TASK [start httpd service] ****************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

PLAY RECAP ********************************************************************************************************************************************************************************************************
172.27.2.79                : ok=5    changed=3    unreachable=0    failed=0   
172.27.2.88                : ok=5    changed=3    unreachable=0    failed=0   
```


* 验证：

配置文件是否备份成功：
```bash 
[root@falcon ansible]# ansible falcon -m shell -a "ls -lh /etc/httpd/conf/"
172.27.2.79 | SUCCESS | rc=0 >>
total 40K
-rw-r--r--. 1 root root 12K 6月  22 11:28 httpd.conf
-rw-r--r--. 1 root root 12K 6月  22 11:28 httpd.conf.bak
-rw-r--r--. 1 root root 13K 4月  13 05:04 magic

172.27.2.88 | SUCCESS | rc=0 >>
total 40K
-rw-r--r--. 1 root root 12K 6月  22 11:28 httpd.conf
-rw-r--r--. 1 root root 12K 6月  22 11:28 httpd.conf.bak
-rw-r--r--. 1 root root 13K 4月  13 05:04 magic
```

修改后的监听端口：

```bash 
[root@falcon ansible]# ansible falcon -m shell -a "ss -tnl | grep 8008"
172.27.2.79 | SUCCESS | rc=0 >>
LISTEN     0      128         :::8008                    :::*                  

172.27.2.88 | SUCCESS | rc=0 >>
LISTEN     0      128                      :::8008                    :::*  
```

## Handlers

由特定条件触发的Tasks；

handlers用于当关注的资源发生变化时采取一定的操作。

“notify”这个action可用于在每个play的最后被触发，这样可以避免多次有改变发生时都执行指定的操作，取而代之在所有的变化发生完成后一次性地执行指定操作。

在notify中列出的操作称为handler也即notify中调用handler中定义的操作。

**注意：** 在notify中定义内容一定要和tasks中定义的 - name内容一样，这样才能达到触发的效果，否则不会生效。

```yaml
- name: template configuration file
  template: src=template.j2 dest=/etc/foo.conf
  notify:
  - restart memcached
  - restart apache

#handler是task列表这些task与前述的task并没有本质上的不同。
handlers:
  - name: restart memcached
    service: name=memcached state=restarted
  - name: restart apache
    service: name=apache state=restarted 
```

格式：

```yaml
tasks:
  - name: TASK_NAME
    module: arguments
    notify: 
    - HANDLER_NAME1
    - HANDLER_NAME2
    handlers:
  - name: HANDLER_NAME1
    module: arguments
  - name: HANDLER_NAME2
    module: arguments
```

Example: 在上面httpd.yaml的基础上修改；

在Ansible端修改配置文件中的监听端口为8009。

修改httpd.yaml如下：

```bash
[root@falcon ansible]# cat httpd.yaml 
- hosts: falcon 
  remote_user: root
  tasks:
  - name: install httpd package
    yum: name=httpd state=latest
  - name: backup apache conf file
    shell: cp /etc/httpd/conf/httpd.conf{,.bak}
  - name: install conf file
    copy: src=/root/ansible/httpd.conf dest=/etc/httpd/conf/httpd.conf
    notify: restart httpd service
  - name: start httpd service
    service: name=httpd state=started enabled=yes
  handlers:
  - name: restart httpd service
    service: name=httpd state=restarted
```

```bash
[root@falcon ansible]# ansible-playbook --syntax-check httpd.yaml 

playbook: httpd.yaml
[root@falcon ansible]# ansible-playbook httpd.yaml 

PLAY [falcon] *****************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [install httpd package] **************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [backup apache conf file] ************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

TASK [install conf file] ******************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

TASK [start httpd service] ****************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

RUNNING HANDLER [restart httpd service] ***************************************************************************************************************************************************************************
changed: [172.27.2.79]
changed: [172.27.2.88]

PLAY RECAP ********************************************************************************************************************************************************************************************************
172.27.2.79                : ok=6    changed=3    unreachable=0    failed=0   
172.27.2.88                : ok=6    changed=3    unreachable=0    failed=0   
```

* 验证结果：
```bash
[root@falcon ansible]# ansible falcon -m shell -a "ss -tnlp | grep 8009"
172.27.2.79 | SUCCESS | rc=0 >>
LISTEN     0      128         :::8009                    :::*                   users:(("httpd",pid=23844,fd=4),("httpd",pid=23843,fd=4),("httpd",pid=23842,fd=4),("httpd",pid=23841,fd=4),("httpd",pid=23840,fd=4),("httpd",pid=23838,fd=4))

172.27.2.88 | SUCCESS | rc=0 >>
LISTEN     0      128                      :::8009                    :::*      users:(("httpd",17037,4),("httpd",17036,4),("httpd",17035,4),("httpd",17034,4),("httpd",17033,4),("httpd",17032,4),("httpd",17031,4))
```


---
在众多模块中只有command和shell模块仅需要给定一个列表而无需使用“key=value”格式；

例如：

```yaml
tasks:
  - name: disable selinux
    command: /sbin/setenforce 0
```
如果命令或脚本的退出码不为0可以使用如下方式替代：

```yaml
tasks:
  - name: run this command and ignore the result.
    shell: /usr/bin/somecommand || /bin/true
```

也可以使用ignore_errors来忽略错误信息；

```yaml
- name: run this command and ignore the result
  shell: /usr/bin/somecommand
  ignore_errors: True
```
---


## tags

给指定的任务定义一个调用标识；

tags用于让用户选择运行或略过playbook中的部分代码。Ansible具有幂等性，因此会自动跳过没有变化的部分。

即便如此，有些代码为测试其确实没有发生变化的时间会非常的长；

此时如果确信其没有变化就可以通过tags跳过这些代码片段；


定义tags的格式：

```yaml
- name: NAME
  module: arguments
  tags: TAG_ID
```

Example：修改ansible端配置文件中的监听端口后，使用ansible-playbook -t TAG_ID[,...] 执行指定的tasks；

```bash
[root@falcon ansible]# cat httpd.yaml
- hosts: falcon 
  remote_user: root
  tasks:
  - name: install httpd package
    yum: name=httpd state=latest
  - name: backup apache conf file
    shell: cp /etc/httpd/conf/httpd.conf{,.bak}
  - name: install conf file
    copy: src=/root/ansible/httpd.conf dest=/etc/httpd/conf/httpd.conf
    tags: instconf
    notify: restart httpd service
  - name: start httpd service
    service: name=httpd state=started enabled=yes
  handlers:
  - name: restart httpd service
    service: name=httpd state=restarted
[root@falcon ansible]# ansible-playbook --syntax-check httpd.yaml 

playbook: httpd.yaml
```

此处可以查看到该yaml脚本有一个标签，影响着falcon组：

```bash 
[root@falcon ansible]# ansible-playbook --list-tags httpd.yaml 

playbook: httpd.yaml

  play #1 (falcon): falcon	TAGS: []
      TASK TAGS: [instconf]
```

* 测试运行
```bash 
[root@falcon ansible]# ansible-playbook -C -t instconf httpd.yaml 

PLAY [falcon] *****************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [install conf file] ******************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

RUNNING HANDLER [restart httpd service] ***************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

PLAY RECAP ********************************************************************************************************************************************************************************************************
172.27.2.79                : ok=3    changed=2    unreachable=0    failed=0   
172.27.2.88                : ok=3    changed=2    unreachable=0    failed=0   
```

正式运行一下，指定以instconf的标签运行，所以此处不会显示其他多余的信息，包括安装httpd包和启动httpd服务;

```bash 
[root@falcon ansible]# ansible-playbook -t instconf httpd.yaml 

PLAY [falcon] *****************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************************************************************************************************************
ok: [172.27.2.79]
ok: [172.27.2.88]

TASK [install conf file] ******************************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

RUNNING HANDLER [restart httpd service] ***************************************************************************************************************************************************************************
changed: [172.27.2.88]
changed: [172.27.2.79]

PLAY RECAP ********************************************************************************************************************************************************************************************************
172.27.2.79                : ok=3    changed=2    unreachable=0    failed=0   
172.27.2.88                : ok=3    changed=2    unreachable=0    failed=0   
```

验证该结果：

```bash 
[root@falcon ansible]# cat httpd.conf | grep ^Listen
Listen 8099
[root@falcon ansible]# ansible falcon -m shell -a "ss -tnl | grep 8099"
172.27.2.79 | SUCCESS | rc=0 >>
LISTEN     0      128         :::8099                    :::*                  

172.27.2.88 | SUCCESS | rc=0 >>
LISTEN     0      128                      :::8099                    :::*    
```

也可以对同一个文件标记多个标签同时执行,只需要执行ansible-playbook -t TAG_ID1,TAG_ID2[,....] *.yaml

