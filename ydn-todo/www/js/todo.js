

var Todo = function() {
  this.console_div = document.getElementById('debug-console');


};


Todo.prototype.log = function(s) {
  var div = document.createElement('div');
  div.textContent = s;
  this.console_div.appendChild(div);


};



Todo.prototype.deleteTodo = function (id) {
  this.db.remove('todo', id).fail(function(e) {
    throw e;
  });

  this.getAllTodoItems();
};

Todo.prototype.getAllTodoItems = function () {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var df = this.db.values('todo');

  df.done(function (items) {
    var n = items.length;
    for (var i = 0; i < n; i++) {
      this.renderTodo(items[i]);
    }
  }, this);

  df.fail(function (e) {
    throw e;
  })
};

Todo.prototype.renderTodo = function (row) {
  var todos = document.getElementById("todoItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode(row.text);

  var me = this;
  a.addEventListener("click", function () {
    me.deleteTodo(row.timeStamp);
  }, false);

  a.textContent = " [Delete]";
  li.appendChild(t);
  li.appendChild(a);
  todos.appendChild(li)
};

Todo.prototype.addTodo = function () {
  var todo = document.getElementById("todo");

  var data = {
    "text":todo.value,
    "timeStamp":new Date().getTime()
  };
  this.db.put('todo', data).fail(function(e) {
    throw e;
  });

  todo.value = "";

  this.getAllTodoItems();
};

Todo.prototype.init = function() {
  this.log('todo app init');
  ydn.debug.log('ydn.db', 'fine');

  if (window.sqlitePlugin !== undefined) {
    this.log('SqlitePlugin .');
  } else {
    this.log('No SqlitePlugin .');
  }

  var schema = {
    stores:[{
      name:'todo',
      keyPath:"timeStamp"
    }]
  };

  var db_name = 'todo_2';

  var options = {mechanisms: ['indexeddb', 'websql']};

  /**
   * @type {ydn.db.Storage}
   */
  this.db = new ydn.db.Storage(db_name, schema, options);

  this.db.addEventListener('ready', function(e) {
    var err = e.getError();
    if (err) {
      this.log('error ' + JSON.stringify(err));
      throw err;
    } else {
      this.log(db + 'ready');
    }
  }, false, this);

  this.getAllTodoItems();

  var me = this;
  document.addEventListener('pause', function() {
    me.db.close();
  });

  document.addEventListener('resume', function() {
    me.db = new ydn.db.Storage(db_name, schema);
  });

  document.getElementById('add-todo').onclick = function() {
    me.addTodo();
    return false;
  }
}


