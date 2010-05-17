

var queue = function() {
    this.data = []; 
    this.itemId = 0;

};

queue.prototype = {

    push: function(data) {
       this.data.unshift({ id: ++this.itemId, data: data });
       return this.itemId;
    },

    pop: function() {
        return this.data.shift();
    },

    count: function() {
        return this.itemId;
    },

    to_s: function() {
        return JSON.stringify(this.data);
    }

};

exports.queue = queue;
exports.create = queue;
