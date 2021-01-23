# 查看container的ip地址
docker inspect <container name or id>| grep IPAddress
# 查看container映射的端口
docker port <container name or id>
# eg.
docker port d8dac7399647
docker port hfq-jedi-zxf-eden