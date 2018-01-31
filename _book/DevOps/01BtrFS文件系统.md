## BtrFS文件系统

Btrfs(B-tree文件系统，通常念成Butter FS，Better FS或B-tree FS)，一种支持写入时复制(COW)的文件系统，运行在Linux操作系统上，采用GPL授权。

Oracle与2007年对外宣布这项计划，并发布源代码，2014年8月发布稳定版。

目标是取代Linux当时主流的ext3文件系统，摆脱ext3的一些限制，特别是单文件大小，文件系统总大小和文件校验，并加入ext3不支持的一些功能，比如：
* 可写快照(writeable snapshots)；
* 快照的快照(snapshots of snapshots)；
* 内建磁盘阵列(RAID)；
* 子卷(subvolumes)；

Btrfs也宣称专注于：容错、修复及易于管理。

Btrfs是一种新型的写时复制(COW) Linux文件系统已经并入内核主线。Btrfs设计实现高级功能的同时，着重于容错、修复以及易于管理。

它由Oracle，Red Hat，Fujitsu，Intel，SUSE，STRATO等企业和开发者共同开发，Btrfs以GNU GPL协议授权。


## 准备工作

Btrfs支持已经包含在linux和linux-lts的内核中。

GRUB 2，mkinitcpio和Syslinux也已经支持Btrfs，不需要额外配置。

要使用一些用户空间工具：安装btrfs-progs软件包；

## 分区

Btrfs能在整个设备上使用，替代MBR或GPT分区表，但是并不要求一定这么做，最简单的方法是在一个已存在的分区上创建btrfs文件系统。

如果选择用btrfs替代分区表，可以用子卷模拟不同的分区。

这是在单个设备上使用btrfs文件系统的限制：
* 不能在不同的挂载点上使用不同的文件系统；
* 不能使用交换空间(因为btrfs不支持交换文件,而且硬盘上没有空间用来船舰交换分区。)这同时也限制了睡眠和休眠(因为需要交换空间)。
* 不能使用UEFI启动；

运行下面的命令把整个设备的分区表替换成btrfs：
```bash
# mkfs.btrfs /dev/sdX
例如/dev/sda而不是/dev/sda1.后一种形式会格式化现有的分区而不是替换原有的分区表。
```

像使用普通的MBR分区表存储设备一样安装**启动管理器**,例如GRUB：
```bash
# grub-install --recheck /dev/sdX
```

## 创建文件系统

    可以新建或者从已有文件系统转化为Btrfs。

### 1、新建文件系统：

#### 单一设备上的文件系统：

要格式化一个分区：
```bash
# mkfs.btrfs -L mylabel /dev/partition
```

Btrfs的默认块大小为16kb。使用更大的blocksize数据/元数据，可以为nodesize通过指定一个值，使用-n参数使用，如本例所示16kb块。
```bash
# mkfs.btrfs -L mylabel -n 16k /dev/partition
```

#### 多设备文件系统：

用户可选择多个设备来创建RAID。支持的RAID级别有RAID 0，RAID 1，RAID 10，RAID 5和RAID 6。

数据和元数据的RAID登记可以用-d和-m参数指定。

默认情况下元数据使用镜像(RAID 1)，而数据使用 strip(RAID 0)。

```bash
# mkfs.btrfs -d raid0 -m raid1 /dev/part1 /dev/part2 ...
```

### 2、从Ext3/4转换(危险性较高，请做好备份或心理准备)

从安装CD启动，然后转化分区：

```bash
# btrfs-convert /dev/partition
```
挂载转换后的分区并修改/etc/fstab文件，指定分区类型(type为btrfs，fs_passno[最后一些]修改为0，Btrfs在启动时并不进行磁盘检查)。

还要注意的时分区的UUID将有改变，所以使用UUID时，更新fstab中相应的条目。


