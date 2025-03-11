Rem 需要以windows系統管理員權限執行
Rem 加入防火牆輸入規則 允許port 22,80,443
New-NetFirewallRule -DisplayName "WSL2 Port Bridge" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 22,80,443
Rem port 轉發 22->22,80->8080,443->8443
netsh interface portproxy add v4tov4 listenport=22 listenaddress=0.0.0.0 connectport=22 connectaddress=172.23.72.217
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=8080 connectaddress=172.23.72.217
netsh interface portproxy add v4tov4 listenport=443 listenaddress=0.0.0.0 connectport=8443 connectaddress=172.23.72.217
pause
Rem 查看轉發設定結果是否正確
netsh interface portproxy show v4tov4
echo WSL2 port bridge completed.
pause