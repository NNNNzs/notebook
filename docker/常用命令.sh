# 查看所有container
docker ps -a 
# redis启动
docker run -itd --name redis-test -p 6379:6379 redis

# 查看container的ip地址
docker inspect <container name or id>| grep IPAddress
# 查看container映射的端口
docker port <container name or id>