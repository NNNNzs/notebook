#!/bin/sh
# 此脚本路径：/etc/storage/serverchan_script.sh
# 自定义设置 - 脚本 - 自定义 Crontab 定时任务配置，可自定义启动时间
source /etc/storage/script/init.sh
export PATH='/etc/storage/bin:/tmp/script:/etc/storage/script:/opt/usr/sbin:/opt/usr/bin:/opt/sbin:/opt/bin:/usr/local/sbin:/usr/sbin:/usr/bin:/sbin:/bin'
export LD_LIBRARY_PATH=/lib:/opt/lib
serverchan_enable=`nvram get serverchan_enable`
serverchan_enable=${serverchan_enable:-"0"}
serverchan_sckey=`nvram get serverchan_sckey`
serverchan_notify_1=`nvram get serverchan_notify_1`
serverchan_notify_2=`nvram get serverchan_notify_2`
serverchan_notify_3=`nvram get serverchan_notify_3`
serverchan_notify_4=`nvram get serverchan_notify_4`
mkdir -p /tmp/var
resub=1
# 获得外网地址
    arIpAddress() {
    curltest=`which curl`
    if [ -z "$curltest" ] || [ ! -s "`which curl`" ] ; then
        wget --no-check-certificate --quiet --output-document=- "http://members.3322.org/dyndns/getip"
        #wget --no-check-certificate --quiet --output-document=- "1212.ip138.com/ic.asp" | grep -E -o '([0-9]+\.){3}[0-9]+'
        #wget --no-check-certificate --quiet --output-document=- "ip.6655.com/ip.aspx"
        #wget --no-check-certificate --quiet --output-document=- "ip.3322.net"
    else
        curl -k -s "http://members.3322.org/dyndns/getip"
        #curl -k -s 1212.ip138.com/ic.asp | grep -E -o '([0-9]+\.){3}[0-9]+'
        #curl -k -s ip.6655.com/ip.aspx
        #curl -k -s ip.3322.net
    fi
    }
# 读取最近外网地址
    lastIPAddress() {
        local inter="/etc/storage/lastIPAddress"
        cat $inter
    }

while [ "$serverchan_enable" = "1" ];
do
serverchan_enable=`nvram get serverchan_enable`
serverchan_enable=${serverchan_enable:-"0"}
serverchan_sckey=`nvram get serverchan_sckey`
serverchan_notify_1=`nvram get serverchan_notify_1`
serverchan_notify_2=`nvram get serverchan_notify_2`
serverchan_notify_3=`nvram get serverchan_notify_3`
serverchan_notify_4=`nvram get serverchan_notify_4`
curltest=`which curl`
if [ -z "$curltest" ] ; then
    wget --continue --no-check-certificate  -q -T 10 http://www.163.com
    [ "$?" == "0" ] && check=200 || check=404
else
    check=`curl -k -s -w "%{http_code}" "http://www.163.com" -o /dev/null`
fi
if [ "$check" == "200" ] ; then
echo "online"
if [ "$serverchan_notify_1" = "1" ] ; then
    local hostIP=$(arIpAddress)
    local lastIP=$(lastIPAddress)
    if [ "$lastIP" != "$hostIP" ] && [ ! -z "$hostIP" ] ; then
    sleep 60
        local hostIP=$(arIpAddress)
        local lastIP=$(lastIPAddress)
    fi
    if [ "$lastIP" != "$hostIP" ] && [ ! -z "$hostIP" ] ; then
        logger -t "【互联网 IP 变动】" "目前 IP: ${hostIP}"
        logger -t "【互联网 IP 变动】" "上次 IP: ${lastIP}"
        curl -s "http://sc.ftqq.com/$serverchan_sckey.send?text=【PDCN_"`nvram get computer_name`"】互联网IP变动" -d "&desp=${hostIP}" &
        logger -t "【微信推送】" "互联网IP变动:${hostIP}"
        echo -n $hostIP > /etc/storage/lastIPAddress
    fi
fi
if [ "$serverchan_notify_2" = "1" ] ; then
    # 获取接入设备名称
    touch /tmp/var/newhostname.txt
    echo "接入设备名称" > /tmp/var/newhostname.txt
    #cat /tmp/syslog.log | grep 'Found new hostname' | awk '{print $7" "$8}' >> /tmp/var/newhostname.txt
    cat /tmp/static_ip.inf | grep -v "^$" | awk -F "," '{ if ( $6 == 0 ) print "【内网IP："$1"，ＭＡＣ："$2"，名称："$3"】  "}' >> /tmp/var/newhostname.txt
    # 读取以往接入设备名称
    touch /etc/storage/hostname.txt
    [ ! -s /etc/storage/hostname.txt ] && echo "接入设备名称" > /etc/storage/hostname.txt
    # 获取新接入设备名称
    awk 'NR==FNR{a[$0]++} NR>FNR&&a[$0]' /etc/storage/hostname.txt /tmp/var/newhostname.txt > /tmp/var/newhostname相同行.txt
    awk 'NR==FNR{a[$0]++} NR>FNR&&!a[$0]' /tmp/var/newhostname相同行.txt /tmp/var/newhostname.txt > /tmp/var/newhostname不重复.txt
    if [ -s "/tmp/var/newhostname不重复.txt" ] ; then
        content=`cat /tmp/var/newhostname不重复.txt | grep -v "^$"`
        curl -s "http://sc.ftqq.com/$serverchan_sckey.send?text=【PDCN_"`nvram get computer_name`"】新设备加入" -d "&desp=${content}" &
        logger -t "【微信推送】" "PDCN新设备加入:${content}"
        cat /tmp/var/newhostname不重复.txt | grep -v "^$" >> /etc/storage/hostname.txt
    fi
fi
if [ "$serverchan_notify_4" = "1" ] ; then
    # 设备上、下线提醒
    # 获取接入设备名称
    touch /tmp/var/newhostname.txt
    echo "接入设备名称" > /tmp/var/newhostname.txt
    #cat /tmp/syslog.log | grep 'Found new hostname' | awk '{print $7" "$8}' >> /tmp/var/newhostname.txt
    cat /tmp/static_ip.inf | grep -v "^$" | awk -F "," '{ if ( $6 == 0 ) print "【内网IP："$1"，ＭＡＣ："$2"，名称："$3"】  "}' >> /tmp/var/newhostname.txt
    # 读取以往上线设备名称
    touch /etc/storage/hostname_上线.txt
    [ ! -s /etc/storage/hostname_上线.txt ] && echo "接入设备名称" > /etc/storage/hostname_上线.txt
    # 上线
    awk 'NR==FNR{a[$0]++} NR>FNR&&a[$0]' /etc/storage/hostname_上线.txt /tmp/var/newhostname.txt > /tmp/var/newhostname相同行_上线.txt
    awk 'NR==FNR{a[$0]++} NR>FNR&&!a[$0]' /tmp/var/newhostname相同行_上线.txt /tmp/var/newhostname.txt > /tmp/var/newhostname不重复_上线.txt
    if [ -s "/tmp/var/newhostname不重复_上线.txt" ] ; then
        content=`cat /tmp/var/newhostname不重复_上线.txt | grep -v "^$"`
        curl -s "http://sc.ftqq.com/$serverchan_sckey.send?text=【PDCN_"`nvram get computer_name`"】设备【上线】Online" -d "&desp=${content}" &
        logger -t "【微信推送】" "PDCN设备【上线】:${content}"
        cat /tmp/var/newhostname不重复_上线.txt | grep -v "^$" >> /etc/storage/hostname_上线.txt
    fi
    # 下线
    awk 'NR==FNR{a[$0]++} NR>FNR&&!a[$0]' /tmp/var/newhostname.txt /etc/storage/hostname_上线.txt > /tmp/var/newhostname不重复_下线.txt
    if [ -s "/tmp/var/newhostname不重复_下线.txt" ] ; then
        content=`cat /tmp/var/newhostname不重复_下线.txt | grep -v "^$"`
        curl -s "http://sc.ftqq.com/$serverchan_sckey.send?text=【PDCN_"`nvram get computer_name`"】设备【下线】offline" -d "&desp=${content}" &
        logger -t "【微信推送】" "PDCN设备【下线】:${content}"
        cat /tmp/var/newhostname.txt | grep -v "^$" > /etc/storage/hostname_上线.txt
    fi
fi
if [ "$serverchan_notify_3" = "1" ] && [ "$resub" = "1" ] ; then
    # 固件更新提醒
    [ ! -f /tmp/var/osub ] && echo -n `nvram get firmver_sub` > /tmp/var/osub
    rm -f /tmp/var/nsub
    wgetcurl.sh "/tmp/var/nsub" "$hiboyfile/osub" "$hiboyfile2/osub"
    if [ $(cat /tmp/var/osub) != $(cat /tmp/var/nsub) ] && [ -f /tmp/var/nsub ] ; then
        echo -n `nvram get firmver_sub` > /tmp/var/osub
        content="新的固件： `cat /tmp/var/nsub | grep -v "^$"` ，目前旧固件： `cat /tmp/var/osub | grep -v "^$"` "
        logger -t "【微信推送】" "固件 新的更新：${content}"
        curl -s "http://sc.ftqq.com/$serverchan_sckey.send?text=【PDCN_"`nvram get computer_name`"】固件更新提醒" -d "&desp=${content}" &
        echo -n `cat /tmp/var/nsub | grep -v "^$"` > /tmp/var/osub
    fi
fi
    resub=`expr $resub + 1`
    [ "$resub" -gt 360 ] && resub=1
else
echo "Internet down 互联网断线"
resub=1
fi
sleep 60
continue
done

