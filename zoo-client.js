node ./src/comm/client/zoo-client.js


- let zk = ZooKeeper.createClient(process.argv[2]);
- zk.connect();
	- zk.once('connected', function() { ... }
		// create /caliper/clients znode
		- zkUtil.createP(zk, zkUtil.NODE_ROOT, null, ZooKeeper.CreateMode.PERSISTENT, ...)
		- zkUtil.createP(zk, zkUtil.NODE_CLIENT, null, ZooKeeper.CreateMode.PERSISTENT, ...)
		// create /caliper/clients/client_{RANDOM}_ znode  & EPHEMERAL_SEQUENTIAL 유형으로 생성하여 시퀀스가 추가됨
		- zkUtil.createP(zk, zkUtil.NODE_CLIENT + '/client_'+random+'_', null, ZooKeeper.CreateMode.EPHEMERAL_SEQUENTIAL, ...)
		- zkUtil.createP(zk, inNode, null, ZooKeeper.CreateMode.PERSISTENT,
		- zkUtil.createP(zk, outNode, null, ZooKeeper.CreateMode.PERSISTENT
		- watch(); // <== 여기서 대기하고 있음
		
		
[watch()]
	// waiting for message in zk nodes
	- zkUtil.watchMsgQueueP(zk, inNode, (data) => { return zooMessageCallback(data); ... } ...);
	- zooMessageCallback(data)
		- beforeTest();
		- zkUtil.removeChildrenP(zk, outNode, ...);
		- clientUtil.startTest(msg.clients, msg, msg.clientargs, updates, results);
			// loop for number 
			- launchClient(updates, results);
				- childProcess.fork(path.join(__dirname, 'local-client.js'));  // <= local-client.js
				- child.on('message', function(msg) {
					- pushResult(pid, msg.data);
					- setPromise(pid, true, null);
			- startTest // 제귀적 호출
		// Send results and release resources after test
		- afterTest();
			// Generate and send txUpdated message
			- txUpdate(); 
				- Blockchain.mergeDefaultTxStats(committed)
				- Blockchain.createNullDefaultTxStats()
				- write(buf)
					- zkUtil.createP(zk, outNode+'/msg_', data, ZooKeeper.CreateMode.EPHEMERAL_SEQUENTIAL, ...)
			- Blockchain.mergeDefaultTxStats(results)
			- Blockchain.createNullDefaultTxStats()
			- write(buf)
				- zkUtil.createP(zk, outNode+'/msg_', data, ZooKeeper.CreateMode.EPHEMERAL_SEQUENTIAL, ...)

