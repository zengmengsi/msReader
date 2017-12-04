# -*- coding:utf-8 -*-

import sys
import json

reload(sys)
sys.setdefaultencoding('utf8')

import urllib
import urllib2
import re
import thread
import time
#

#自定义类
class MyClass:
    #初始化
    def __init__(self):
        self.link=''
        self.name=''

class QWERTYU:
    #初始化方法，定义一些变量
    def __init__(self):
        self.pageIndex = 1
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        #初始化headers
        self.headers = { 'User-Agent' : self.user_agent }
        #存放段子的变量，每一个元素是每一页的段子们
        self.stories = []
        #存放程序是否继续运行的变量
        self.enable = False
    #传入某一页的索引获得页面代码
    def getPage(self,url):
        try:
            # url = 'https://nlp.stanford.edu/blog/'
            # url = 'http://tech.sina.com.cn/roll/yc.html'
            #构建请求的request
            request = urllib2.Request(url,headers = self.headers)
            #利用urlopen获取页面代码
            response = urllib2.urlopen(request)
            #将页面转化为UTF-8编码
            pageCode = response.read().decode('gbk')
            # print pageCode
            return pageCode
        except urllib2.URLError, e:
            if hasattr(e,"reason"):
                print(u"网络错误,错误原因: ",e.reason)
                return None
    #开始方法
    def start(self):
        # print(u"抓取数据 --START-- ")
        # f=open('绝望教室.txt','a')
        arr = []
        pageName = sys.argv[1];
        url= 'http://www.quanshuwang.com/book/'+str(pageName)+'.html'
        pageCode = self.getPage(url)
        # <li><a target="_blank" href="(.*?)" class="l mr10"><img  onerror="this.src='/modules/article/images/nocover.jpg'" src="(.*?)" alt="玛法战神" width="120" height="150"></a><img src="/kukuku/images/only2.png" class="topss png_bg"><span class="l"><a target="_blank" title="玛法战神" href="http://www.quanshuwang.com/book_110826.html" class="clearfix stitle">玛法战神</a>作者：<a href="/modules/article/authorarticle.php?author=%BD%AA%B4%F3%C5%DA">姜大炮</a><em class="c999 clearfix">    在人类与妖魔共存的世界，这里是拥有斗气，魔法与道术的玛...<a href="http://www.quanshuwang.com/book_110826.html">更多</a></em><a href="http://www.quanshuwang.com/book_110826.html" class="readTo">马上阅读</a></span></li>
        pattern = re.compile('<em class="l">(.*?)</em><strong class="l jieqi_title">(.*?)</strong>.*?<div class="mainContenr"   id="content"><script type="text/javascript">.*?</script>(.*?)<script type="text/javascript">.*?<a href="http://www.quanshuwang.com/book/(.*?).html" class="pre">.*?class="backfor">.*?</a><a href="http://www.quanshuwang.com/book/(.*?).html" class="next">',re.S)
        items = re.findall(pattern,pageCode)
        #遍历正则表达式匹配的信息
        myClass= MyClass()
        for item in items:
            myClass.name = item[0]
            myClass.link = item[1].replace("章 节目录 ","\n")
            myClass.msg = item[2].replace("&nbsp;&nbsp;&nbsp;&nbsp;","　　").replace("<br />\r\n<br />","\n")
            # print myClass.msg
            myClass.befoPage = item[3]
            myClass.nextPage = item[4]

            myClassDict = myClass.__dict__
            #打印字典
            #字典转化为json
            myClassJson = json.dumps(myClassDict)
            #打印json数据
            arr.append(myClassJson)

        print arr[0]
        # MyData.s = arr
        # MyData.t = arr1
        # MyDataDict = MyData.__dict__
        # print MyDataDict

spider = QWERTYU()
spider.start()