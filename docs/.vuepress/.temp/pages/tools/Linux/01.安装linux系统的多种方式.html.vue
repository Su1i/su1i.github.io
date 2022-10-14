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
<li>
<p>首先你需要下载VMware软件，建议下载pro版本，安装后只需要百度激活码即可激活，永久使用。
官网：<a href="https://www.vmware.com/cn/products/workstation-pro.html" target="_blank" rel="noopener noreferrer">https://www.vmware.com/cn/products/workstation-pro.html<ExternalLinkIcon/></a></p>
</li>
<li>
<p>vmware安装只需要点下一步即可，实在不行可以百度vmware安装教程。</p>
</li>
<li>
<p>安装好之后的界面：
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_081905.png" alt="" loading="lazy"></p>
</li>
<li>
<p>然后点击创建新的虚拟机
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082159.png" alt="" loading="lazy"></p>
</li>
<li>
<p>选择自定义（高级）
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082314.png" alt="" loading="lazy"></p>
</li>
<li>
<p>默认即可，点击下一步
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082314.png" alt="" loading="lazy"></p>
</li>
<li>
<p>注意，这里选择第三项，稍后安装操作系统
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082539.png" alt="" loading="lazy"></p>
</li>
<li>
<p>这里选择linux，ubuntu 64位
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082659.png" alt="" loading="lazy"></p>
</li>
<li>
<p>虚拟机名称命名为ubuntu，位置放在了d盘，毕竟这玩意还挺占内存的
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_082919.png" alt="" loading="lazy"></p>
</li>
<li>
<p>处理器配置就是你要给虚拟机的核心数量，2,2一般就够用，不够了后期可以再加
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083314.png" alt="" loading="lazy"></p>
</li>
<li>
<p>给虚拟机的内存大小，一般4g够用，豪横一点，直接8g
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083427.png" alt="" loading="lazy"></p>
</li>
<li>
<p>网络类型，默认第二项，使用网络地址转换，相当于大机套小机，虚拟机的所有流量都要通过物理机来传输，第一种桥接模式相当于虚拟机和物理机是独立的两台电脑，在校园网只允许一台设备联网的环境下可能不太方便
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083730.png" alt="" loading="lazy"></p>
</li>
<li>
<p>默认选择第二项，不做更改
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083825.png" alt="" loading="lazy"></p>
</li>
<li>
<p>默认即可，不做更改
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_083909.png" alt="" loading="lazy"></p>
</li>
<li>
<p>继续默认即可，不做修改
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084010.png" alt="" loading="lazy"></p>
</li>
<li>
<p>这里给的是80g，只要是不点立即分配所有空间，那么虚拟机就是用多少就占多少磁盘空间，这个80g的意思是虚拟机的硬盘最大容量
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084010.png" alt="" loading="lazy"></p>
</li>
<li>
<p>接着点下一步，关于这几个选项的区别，貌似不怎么影响使用
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084423.png" alt="" loading="lazy"></p>
</li>
<li>
<p>这个是让你确认虚拟机的配置，点击左下角的自定义硬件
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084630.png" alt="" loading="lazy"></p>
</li>
<li>
<p>选择左侧cd，然后右边选择使用iso映像文件，然后点击浏览，选择刚才下的ubuntu的iso文件
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084905.png" alt="" loading="lazy">
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_084936.png" alt="" loading="lazy">
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_085039.png" alt="" loading="lazy"></p>
</li>
<li>
<p>点击关闭，然后点击完成
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_085136.png" alt="" loading="lazy"></p>
</li>
<li>
<p>点击开启此虚拟机
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_085924.png" alt="" loading="lazy"></p>
</li>
<li>
<p>鼠标点进去可以操控虚拟机，然后可以通过ctrl+alt组合键退出操控虚拟机模式，这里我们选择第一个选项“try or install ubuntu”就行
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090210.png" alt="" loading="lazy"></p>
</li>
<li>
<p>刚打开发现是英文，左侧语言栏拉倒最下面有简体中文的选项,然后点击安装ubuntu
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090345.png" alt="" loading="lazy"></p>
</li>
<li>
<p>选择键盘布局，这一步默认即可，然后点击继续
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090456.png" alt="" loading="lazy"></p>
</li>
<li>
<p>选最小安装，然后不勾选安装的时候下载更新，（这时候下载会非常慢，等安装完之后更换下载服务器，再进行更新），点击继续
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090819.png" alt="" loading="lazy"></p>
</li>
<li>
<p>点击现在安装即可，这一步清除的是虚拟机的磁盘，就是上面设置的80g的那个，不是自己电脑的硬盘，不用害怕
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_090910.png" alt="" loading="lazy"></p>
</li>
<li>
<p>出现这个弹窗点击继续即可
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_091101.png" alt="" loading="lazy"></p>
</li>
<li>
<p>时区选择上海，然后点击继续即可
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_091158.png" alt="" loading="lazy"></p>
</li>
<li>
<p>进行一些基本设置，这一步看自己喜好来就行，密码不要忘了就行，然后点击继续
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com/tools/linux/01/clipboard_20221011_091338.png" alt="" loading="lazy"></p>
</li>
<li>
<p>然后经过漫长的等待，就安装完成了</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141931317.png" alt="image-20221014193140701" loading="lazy"></p>
</li>
<li>
<p>直接点击现在重启即可</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141936702.png" alt="image-20221014193600611" loading="lazy"></p>
<ul>
<li>出现这种情况说明我们的安装介质没有取出，就是那个iso文件，这里直接回车就行，等待一会就会出现登录界面</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141938036.png" alt="image-20221014193847950" loading="lazy"></p>
<ul>
<li>这时候我们先点击关机，取出安装介质，关机在ubuntu系统右上角的位置，或者直接点击上面的倒三角，强制关闭虚拟机，类似于直接拔掉虚拟机的电源插头。</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141941006.png" alt="image-20221014194105926" loading="lazy"></p>
<ul>
<li>关机之后，点开设置里面的cd/dvd选项</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141942480.png" alt="image-20221014194231403" loading="lazy"></p>
<ul>
<li>然后将使用iso映像文件选项改成上面的使用物理驱动器，自动检测，然后关闭即可，这时候再开启虚拟机就可以进入系统了，然后我们还需要再进行一些配置，来方便我们使用</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141943333.png" alt="image-20221014194335268" loading="lazy"></p>
<ul>
<li>这个时候我们发现分辨率有一些问题，影响我们使用，我们需要安装vmtools来让虚拟机自动调节分辨率</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141949567.png" alt="image-20221014194950317" loading="lazy"></p>
<ul>
<li>点击虚拟机，然后选择重新安装vmtools</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141951439.png" alt="image-20221014195126202" loading="lazy"></p>
<ul>
<li>这时候出现一个弹窗，点击进去，可以看到里面有几个文件</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141954290.png" alt="image-20221014195416055" loading="lazy"></p>
<ul>
<li>将这些文件复制到“下载”文件夹里面</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141956716.png" alt="image-20221014195646628" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210141959000.png" alt="image-20221014195913923" loading="lazy"></p>
<ul>
<li>将第一个文件，以.tar.gz结尾的文件解压到当前位置</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142000305.png" alt="image-20221014200047198" loading="lazy"></p>
<ul>
<li>进到文件夹里面，找到这个位置，然后右键在终端打开</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142005110.png" alt="image-20221014200526026" loading="lazy"></p>
<ul>
<li>然后在终端输入：</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo ./vmware-install.pl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142007445.png" alt="image-20221014200716367" loading="lazy"></p>
<ul>
<li>此处提示输入密码，注意，输入密码并没有****之类的占位符，屏幕上什么反应都没有，直接输入密码并回车就行</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142009502.png" alt="image-20221014200909419" loading="lazy"></p>
<ul>
<li>碰到这种问yes或no的，直接输入yes就行，然后一路回车，就可以了，然后重启</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142011898.png" alt="image-20221014201128808" loading="lazy"></p>
<ul>
<li>验证是否安装成功的方法是拖动窗口大小的时候，ubuntu会自动适应vmware的窗口大小</li>
<li>接下来还需要换源，说白了就是更换一下下载软件时的服务器，默认下载服务器在国外，网速较慢，换到国内可以提高速度</li>
<li>点击左下角的九个点，打开应用程序菜单，然后选择软件和更新</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142018994.png" alt="image-20221014201829928" loading="lazy"></p>
<ul>
<li>点开之后，点开这个选项，建议选择阿里云的服务器，比较稳定，<a href="http://xn--4gq0d68mvtbfa427a03az5cj15di2bjx1kxgtc.xn--cn-ng5du80i.com" target="_blank" rel="noopener noreferrer">中国服务器域名后面一般是.cn或者.com<ExternalLinkIcon/></a>，阿里的服务器上面有aliyun的字母</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142022699.png" alt="image-20221014202220627" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142021955.png" alt="image-20221014202142871" loading="lazy"></p>
<ul>
<li>然后点击确定即可，需要输入密码确定一下，然后点击关闭之后需要下载更新，稍等一下即可</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142023801.png" alt="image-20221014202338714" loading="lazy"></p>
<ul>
<li>然后打开终端，输入sudo apt update可以更新软件列表，显示可更新的软件</li>
<li>再输入sudo apt upgrade即可更新所有软件</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142025981.png" alt="image-20221014202524902" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142025670.png" alt="image-20221014202557602" loading="lazy"></p>
<ul>
<li>输入y回车之后就可以开始更新了，更新完之后就可以愉快的开始使用了</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210142028920.png" alt="image-20221014202817833" loading="lazy"></p>
<ul>
<li>更新界面，耐心等待就好了，有时候更新完之后需要重启，点击右上角重启即可</li>
</ul>
<h3 id="_2-使用virtualbox虚拟机" tabindex="-1"><a class="header-anchor" href="#_2-使用virtualbox虚拟机" aria-hidden="true">#</a> 2.使用virtualBox虚拟机</h3>
<p>virtualbox的使用方式和vmware差不多，因为是开源软件，并且免费试用，所以virtualbox不需要激活码之类的，直接安装使用就行
官网链接：<a href="https://www.virtualbox.org/" target="_blank" rel="noopener noreferrer">https://www.virtualbox.org/<ExternalLinkIcon/></a></p>
<h2 id="二、使用windows的linux子系统" tabindex="-1"><a class="header-anchor" href="#二、使用windows的linux子系统" aria-hidden="true">#</a> 二、使用Windows的linux子系统</h2>
<h2 id="三、使用docker" tabindex="-1"><a class="header-anchor" href="#三、使用docker" aria-hidden="true">#</a> 三、使用docker</h2>
<h2 id="四、使用云服务器" tabindex="-1"><a class="header-anchor" href="#四、使用云服务器" aria-hidden="true">#</a> 四、使用云服务器</h2>
<h2 id="五、物理机安装双系统" tabindex="-1"><a class="header-anchor" href="#五、物理机安装双系统" aria-hidden="true">#</a> 五、物理机安装双系统</h2>
</div></template>


