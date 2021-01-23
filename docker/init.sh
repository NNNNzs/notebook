# centos init 
yum install -y git
yum install nginx
#  安装完后，
 rpm -qa | grep nginx 
#  查看
# 启动nginx：
systemctl start nginx
# 加入开机启动：
systemctl enable nginx
# 查看nginx的状态：
systemctl status nginx

# 安装mysql
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server

systemctl start  mysqld.service
systemctl status mysqld.service
# 找到mysql 数据库 密码
grep "password" /var/log/mysqld.log

mysql -u root -p

ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
# 修改为弱密码
show variables like '%password%';

vi /etc/my.cnf
#添加validate_password_policy配置
validate_password_policy=0
#关闭密码策略
validate_password = off

systemctl restart mysqld


# docker启动的时候增加参数--privileged ，开启特权，可以设置容器里的内核参数。
# Centos
docker run -tid --name centos01 --privileged=true centos8 /usr/sbin/init