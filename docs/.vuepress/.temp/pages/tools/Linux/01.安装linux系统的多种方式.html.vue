<template><div><h1 id="安装linux系统的多种方式" tabindex="-1"><a class="header-anchor" href="#安装linux系统的多种方式" aria-hidden="true">#</a> 安装linux系统的多种方式</h1>
<h2 id="一、使用虚拟机" tabindex="-1"><a class="header-anchor" href="#一、使用虚拟机" aria-hidden="true">#</a> 一、使用虚拟机</h2>
<ul>
<li>百度百科： 虚拟机（Virtual Machine）指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离环境中的完整计算机系统。在实体计算机中能够完成的工作在虚拟机中都能够实现。在计算机中创建虚拟机时，需要将实体机的部分硬盘和内存容量作为虚拟机的硬盘和内存容量。每个虚拟机都有独立的CMOS、硬盘和操作系统，可以像使用实体机一样对虚拟机进行操作。</li>
<li>电脑上的安卓模拟器，如雷电，夜神等也可以看做是虚拟机，貌似是基于virtualBox虚拟机软件开发。</li>
<li>桌面虚拟机领域的两个大佬：VMware，virtualBox。</li>
<li>linux发行版选择ubuntu desktop，简单易上手。</li>
</ul>
<h3 id="_0-下载ubuntu镜像" tabindex="-1"><a class="header-anchor" href="#_0-下载ubuntu镜像" aria-hidden="true">#</a> 0.下载ubuntu镜像</h3>
<p>官网地址:<a href="https://cn.ubuntu.com/desktop" target="_blank" rel="noopener noreferrer">https://cn.ubuntu.com/desktop<ExternalLinkIcon/></a>
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_073857.png" alt="" loading="lazy">
点击“下载ubuntu”
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_074336.png" alt="" loading="lazy"></p>
<ul>
<li>
<p>点击下载，如果需要其他下载方式，比如通过迅雷种子下载，或者下载其他版本，点击“其他下载”。</p>
</li>
<li>
<p>开始下载后，请将下载的“吧啦吧啦.iso”文件放到一个能找到的位置，不建议放到桌面，毕竟该文件占用大小约为4G，建议在D盘或者F盘新建一个文件夹，用以存放iso文件和后续的虚拟机文件，iso文件和虚拟机文件大约会占用20G以上的空间。</p>
</li>
</ul>
<p>这是我在d盘新建的vm文件夹，专门用来存放iso文件和虚拟机文件。
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_074909.png" alt="" loading="lazy">
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_075050.png" alt="" loading="lazy">
创建的专门存放iso文件的文件夹：
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_075126.png" alt="" loading="lazy"></p>
<h3 id="_1-使用vmware虚拟机" tabindex="-1"><a class="header-anchor" href="#_1-使用vmware虚拟机" aria-hidden="true">#</a> 1.使用VMware虚拟机</h3>
<ul>
<li>首先你需要下载VMware软件，建议下载pro版本，安装后只需要百度激活码即可激活，永久使用。
官网：<a href="https://www.vmware.com/cn/products/workstation-pro.html" target="_blank" rel="noopener noreferrer">https://www.vmware.com/cn/products/workstation-pro.html<ExternalLinkIcon/></a></li>
<li>vmware安装只需要点下一步即可，实在不行可以百度vmware安装教程。</li>
<li>安装好之后的界面：
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_081905.png" alt="" loading="lazy"></li>
<li>然后点击创建新的虚拟机
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082159.png" alt="" loading="lazy"></li>
<li>选择自定义（高级）
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082314.png" alt="" loading="lazy"></li>
<li>默认即可，点击下一步
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082314.png" alt="" loading="lazy"></li>
<li>注意，这里选择第三项，稍后安装操作系统
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082539.png" alt="" loading="lazy"></li>
<li>这里选择linux，ubuntu 64位
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082659.png" alt="" loading="lazy"></li>
<li>虚拟机名称命名为ubuntu，位置放在了d盘，毕竟这玩意还挺占内存的
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082919.png" alt="" loading="lazy"></li>
<li>处理器配置就是你要给虚拟机的核心数量，2,2一般就够用，不够了后期可以再加
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083314.png" alt="" loading="lazy"></li>
<li>给虚拟机的内存大小，一般4g够用，豪横一点，直接8g
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083427.png" alt="" loading="lazy"></li>
<li>网络类型，默认第二项，使用网络地址转换，相当于大机套小机，虚拟机的所有流量都要通过物理机来传输，第一种桥接模式相当于虚拟机和物理机是独立的两台电脑，在校园网只允许一台设备联网的环境下可能不太方便
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083730.png" alt="" loading="lazy"></li>
<li>默认选择第二项，不做更改
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083825.png" alt="" loading="lazy"></li>
<li>默认即可，不做更改
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083909.png" alt="" loading="lazy"></li>
<li>继续默认即可，不做修改
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084010.png" alt="" loading="lazy"></li>
<li>这里给的是80g，只要是不点立即分配所有空间，那么虚拟机就是用多少就占多少磁盘空间，这个80g的意思是虚拟机的硬盘最大容量
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084010.png" alt="" loading="lazy"></li>
<li>接着点下一步，关于这几个选项的区别，貌似不怎么影响使用
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084423.png" alt="" loading="lazy"></li>
<li>这个是让你确认虚拟机的配置，点击左下角的自定义硬件
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084630.png" alt="" loading="lazy"></li>
<li>选择左侧cd，然后右边选择使用iso映像文件，然后点击浏览，选择刚才下的ubuntu的iso文件
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084905.png" alt="" loading="lazy">
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084936.png" alt="" loading="lazy">
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_085039.png" alt="" loading="lazy"></li>
<li>点击关闭，然后点击完成
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_085136.png" alt="" loading="lazy"></li>
<li>点击开启此虚拟机
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_085924.png" alt="" loading="lazy"></li>
<li>鼠标点进去可以操控虚拟机，然后可以通过ctrl+alt组合键退出操控虚拟机模式，这里我们选择第一个选项“try or install ubuntu”就行
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090210.png" alt="" loading="lazy"></li>
<li>刚打开发现是英文，左侧语言栏拉倒最下面有简体中文的选项,然后点击安装ubuntu
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090345.png" alt="" loading="lazy"></li>
<li>选择键盘布局，这一步默认即可，然后点击继续
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090456.png" alt="" loading="lazy"></li>
<li>选最小安装，然后不勾选安装的时候下载更新，（这时候下载会非常慢，等安装完之后更换下载服务器，再进行更新），点击继续
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090819.png" alt="" loading="lazy"></li>
<li>点击现在安装即可，这一步清除的是虚拟机的磁盘，就是上面设置的80g的那个，不是自己电脑的硬盘，不用害怕
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090910.png" alt="" loading="lazy"></li>
<li>出现这个弹窗点击继续即可
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_091101.png" alt="" loading="lazy"></li>
<li>时区选择上海，然后点击继续即可
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_091158.png" alt="" loading="lazy"></li>
<li>进行一些基本设置，这一步看自己喜好来就行，密码不要忘了就行，然后点击继续
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_091338.png" alt="" loading="lazy"></li>
<li>然后经过漫长的等待，就安装完成了</li>
</ul>
<h3 id="_2-使用virtualbox虚拟机" tabindex="-1"><a class="header-anchor" href="#_2-使用virtualbox虚拟机" aria-hidden="true">#</a> 2.使用virtualBox虚拟机</h3>
<h2 id="二、使用windows的linux子系统" tabindex="-1"><a class="header-anchor" href="#二、使用windows的linux子系统" aria-hidden="true">#</a> 二、使用Windows的linux子系统</h2>
<h2 id="三、使用docker" tabindex="-1"><a class="header-anchor" href="#三、使用docker" aria-hidden="true">#</a> 三、使用docker</h2>
<h2 id="四、使用云服务器" tabindex="-1"><a class="header-anchor" href="#四、使用云服务器" aria-hidden="true">#</a> 四、使用云服务器</h2>
<h2 id="五、物理机安装双系统" tabindex="-1"><a class="header-anchor" href="#五、物理机安装双系统" aria-hidden="true">#</a> 五、物理机安装双系统</h2>
</div></template>


