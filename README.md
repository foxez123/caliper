# caliper
caliper source analysis

1. 먼저 zoo-client.js를 수행하여 zookeeper서버 연결하고 znode를 만들어 놓는다.
/caliper/clients/client_%RANDOM_%SEQ
/caliper/client_%RANDOM_%SEQ_in
/caliper/client_%RANDOM_%SEQ_out

2. 이후 main.js에서 zookeeper서버 연결하고 만들어 놓은 znode를 확인하고
처리해야 할 성능테스트 정보를 message에 담아 /caliper/client_%RANDOM_%SEQ_in 에 저장한다.

3. zoo-client.js 에서는 /caliper/client_%RANDOM_%SEQ_in 을 모니터링 하고 있다가 들어온 message가 있을 경우
해당 message내용을 기반으로 local-client.js를 수행한다. (message내 clientPerHosts만큼 local-client.js를 수행)

4. [좀 더 확인 필요]
zoo-client.js에서 수행결과를 result객체에 담아 다시 ZK에 저장해 놓고
main.js에서는 ZK내 result 정보를 가져와 리포팅을 만든다.

