# -*- coding:utf-8 -*-

import sys
import json
import urllib
import urllib2
import re
import thread
import time
#
reload(sys)
sys.setdefaultencoding('utf8')

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
            return pageCode
        except urllib2.URLError, e:
            if hasattr(e,"reason"):
                return None
    #开始方法
    def start(self,index):
        # f=open('绝望教室.txt','a')
        arr = []
        url= 'http://www.quanshuwang.com'
        pageCode = self.getPage(url)
        # print pageCode
        if index==1 :
            pattern = re.compile('<a target="_blank" href="http://www.quanshuwang.com/book_(.*?).html" title="(.*?)" class="msgBorder"><img src="(.*?)" width="120" height="150"></a><img src="(.*?)" class="topss png_bg">.*?</a>.*?<a href="(.*?)">(.*?)</a><br>.*?<a href="(.*?)">(.*?)</a></li>',re.S)
            items = re.findall(pattern,pageCode)
            #遍历正则表达式匹配的信息
            myClass= MyClass()
            for item in items:
                myClass.link = item[0]
                myClass.name = item[1]
                myClass.img1 = item[2]
                # myClass.img2 = item[3]
                # myClass.typeUrl = item[4]
                myClass.type = item[5]
                # myClass.authorUrl = item[6].replace("/modules/article/authorarticle.php?author=","")
                myClass.author = item[7]

                myClassDict = myClass.__dict__
                #打印字典
                #字典转化为json
                myClassJson = json.dumps(myClassDict)
                #打印json数据
                arr.append(myClassJson)
            print json.dumps(arr)
        if index==2 :
            pattern = re.compile('<img onerror=".*?"  src="(.*?)" width="120" height="150"></a><img src=".*?" class="topss png_bg"><span class="l"><a href="http://www.quanshuwang.com/book_(.*?).html"  title="(.*?)" class="clearfix stitle">.*?</a>.*?<a href="(.*?)">(.*?)</a><em class="c999 clearfix">(.*?)</em>.*?<a href="http://www.quanshuwang.com/book/(.*?).html"  title="(.*?)">',re.S)
            items = re.findall(pattern,pageCode)
            #遍历正则表达式匹配的信息
            myClass= MyClass()
            for item in items:
                myClass.img = item[0]
                myClass.link = item[1]
                myClass.name = item[2]
                # myClass.authorUrl = item[3].replace("/modules/article/authorarticle.php?author=","")
                myClass.author = item[4]
                myClass.msg = item[5]
                myClass.pageUrl = item[6]
                myClass.page = item[7]

                myClassDict = myClass.__dict__
                #打印字典
                #字典转化为json
                myClassJson = json.dumps(myClassDict)
                #打印json数据
                arr.append(myClassJson)
            print json.dumps(arr)

        if index==3 :
            pattern = re.compile('<li><em class="r">(.*?)</em><a target="_blank" href=".*?" title=".*?">(.*?)</a>.*?<a href="http://www.quanshuwang.com/book_(.*?).html"  title=".*?" target="_blank" class="f14">(.*?)</a>.*?<a href="http://www.quanshuwang.com/book/(.*?).html"  target="_blank">(.*?)</a></li>',re.S)
            items = re.findall(pattern,pageCode)
            #遍历正则表达式匹配的信息
            myClass= MyClass()
            for item in items:
                myClass.author = item[0]
                myClass.type = item[1]
                myClass.link = item[2]
                myClass.name = item[3]
                myClass.pageUrl = item[4]
                myClass.page = item[5]

                myClassDict = myClass.__dict__
                #打印字典
                #字典转化为json
                myClassJson = json.dumps(myClassDict)
                #打印json数据
                arr.append(myClassJson)
            print json.dumps(arr)

        if index==4 :
            pattern = re.compile('<span class="order">(.*?)</span>.*?target="_blank">(.*?)</a></span><a target="_blank" href="http://www.quanshuwang.com/book_(.*?).html".*?>(.*?)</a> <span class="chapter"><a href="http://www.quanshuwang.com/book/(.*?).html" title="(.*?)" target="_blank">',re.S)
            items = re.findall(pattern,pageCode)
            #遍历正则表达式匹配的信息
            myClass= MyClass()
            for item in items:
                myClass.num = item[0]
                myClass.type = item[1]
                myClass.link = item[2]
                myClass.name = item[3]
                myClass.pageUrl = item[4]
                myClass.page = item[5]

                myClassDict = myClass.__dict__
                #打印字典
                #字典转化为json
                myClassJson = json.dumps(myClassDict)
                #打印json数据
                arr.append(myClassJson)
            print json.dumps(arr)

        if index==5 :
            pattern = re.compile('              <li><a href="http://www.quanshuwang.com/book_(.*?).html" target="_blank">(.*?)</a></li>',re.S)
            items = re.findall(pattern,pageCode)
            #遍历正则表达式匹配的信息
            myClass= MyClass()
            for item in items:
                myClass.link = item[0]
                myClass.name = item[1]

                myClassDict = myClass.__dict__
                #打印字典
                #字典转化为json
                myClassJson = json.dumps(myClassDict)
                #打印json数据
                arr.append(myClassJson)
            print json.dumps(arr)

spider = QWERTYU()
spider.start(int(sys.argv[1]))
