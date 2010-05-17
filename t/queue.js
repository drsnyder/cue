
exports.testQueueInit = function(test) {
    var queue = require('queue');
    q = new queue.queue();
    
    test.ok(q.push(1), 'new queue object');
    test.equals(1, q.count(), 'correct count');
    test.equals(1, q.pop().data, 'correct pop');
    test.done();
};

exports.testQueuePushPop = function(test) {
    var queue = require('queue');
    q = new queue.queue();
    
    test.equals(1, q.push(1), 'new queue object');
    test.equals(2, q.push('1'), 'new queue object');
    test.equals(2, q.count(), 'correct count');
    test.equals(1, q.pop().data, 'correct pop');
    test.equals('1', q.pop().data, 'correct pop');
    test.done();
};

exports.testQueueto_s = function(test) {
    var queue = require('queue');
    q = new queue.queue();
    
    test.equals(1, q.push(1), 'new queue object');
    test.equals(2, q.push('1'), 'new queue object');
    test.ok(q.to_s(), 'to string');
    test.done();
};

exports.testQueuePushJSON = function(test) {
    var queue = require('queue');
    q = new queue.queue();
    
    test.equals(1, q.push(JSON.parse('{"pone":"somedata","ptwo":"otherdata"}')), 'new queue object');
    d = q.pop();
    test.equals("somedata", d.data.pone, 'popped expected');
    test.done();

};
