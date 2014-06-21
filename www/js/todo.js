
// ydn.debug.log('ydn.db', 'finest', document.getElementById('debug-console'));

var schema = {
  stores:[{
    name:'todo',
    keyPath:"timeStamp"
  }]
};

var db_name = 'todo_2';

var options = {mechanisms: ['sqlite', 'indexeddb', 'websql']};

/**
 * Create and initialize the database. Depending on platform, this will
 * create IndexedDB or WebSql or even localStorage storage mechanism.
 * @type {ydn.db.Storage}
 */

var db;


var deleteTodo = function (id) {
  db.remove('todo', id).fail(function(e) {
    throw e;
  });

  getAllTodoItems();
};

var getAllTodoItems = function () {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var df = db.values('todo');

  df.done(function (items) {
    var n = items.length;
    for (var i = 0; i < n; i++) {
      renderTodo(items[i]);
    }
  });

  df.fail(function (e) {
    throw e;
  })
};

var renderTodo = function (row) {
  var todos = document.getElementById("todoItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode(row.text);

  a.addEventListener("click", function () {
    deleteTodo(row.timeStamp);
  }, false);

  a.textContent = " [Delete]";
  li.appendChild(t);
  li.appendChild(a);
  todos.appendChild(li)
};

var addTodo = function () {
  var todo = document.getElementById("todo");

  var data = {
    "text":todo.value,
    "timeStamp":new Date().getTime()
  };
  db.put('todo', data).fail(function(e) {
    throw e;
  });

  todo.value = "";

  getAllTodoItems();
};

function runTodo() {
    db = new ydn.db.Storage(db_name, schema, options);

    db.onReady(function(err) {
        if (err) {
            throw err;
        } else {
            var title = document.getElementById('title');
            title.textContent += ' (' + db.getType() + ')';
            getAllTodoItems();
        }
    });


  document.addEventListener('pause', function() {
    db.close();
  });

  document.addEventListener('resume', function() {
    db = new ydn.db.Storage(db_name, schema);
  });
}


