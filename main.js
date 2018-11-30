[caliper main.js]
- main(): benchmark/fabric1.2/main.js
	# before run,  set config file and network file
	- run(): src/comm/bench-flow.js
		- blockchain.init()
		- blockchain.installSmartContract()
		- client.init()
		- blockchain.prepareClients()
		- monitor.start()
		# reduce-loop
		- defaultTest() <================= main function
			# txNumber만큰 test-msg생성
			- for()
				# 아래 msg에 open.js 넣어주고 zk에 던져줌.
				# zoo-client.js에서 zk에서 해당 msg를 꺼내어 직접 blockchain 호출한 후 그 결과를 다시 zk에 update함
				# 최종적으로 zoo callback함수에서 그 결과를 가져온 후 통계처리함
				- msg = { type: 'test', label: 'open', rateControl: {Object}, cb: 'open.js', } 
				- tests.push(msg);
			# 위에서 생성된 tests 배열을 이용한다.  순차적으로 msg를 꺼내서 test를 실행(startTest())함
			- tests.reduce() (loop임)
				- client.startTest(): client.js    <=== tx 별 
					- _startZooTest
						# Send message to test clients via zookeeper service
						- _sendZooMessage()
							# data는 위의 msg임
							- zkUtil.createP('/caliper/clients/{CLIENT_ID}_in/msg_', data)
						# register zk callback 
						- zooStartWatch()
							- zkUtil.watchMsgQueueP
							* zooMessageCallback
					- finishCB = processResult() in bench-flow.js
						- mergeDefaultTxStats(): blockchain.js
						- getResultValue()
  		- printResultsByRound()
  		- monitor.printMaxStats();
        - monitor.stop()
        - report.generate()
        - client.stop()


[caliper's key files]
- blockchain.js
- client.js
- monitor.js
- report.js

[caliper zoo-client.js] <= zk로 들어온 msg정보를 받아서 open.js를 호출하는 역활을 함 (분석필요)

[caliper open.js] <=== 실제 blockchain 호출 함 (분석필요)

[config.json]
- blockchain
	- type
	- config
- test
	- name
	- description
	- clients
	- rounds
- monitor
	- type
	- docker
	- process
	- interval
