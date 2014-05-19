// Copyright 2012 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Todo list exmaple using SqlitePlugin on Phonegap.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

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
  ydn.debug.log('ydn.db', 'info', document.getElementById('debug-console'));

  var schema = {
    stores:[{
      name:'todo',
      keyPath:"timeStamp"
    }]
  };

  var db_name = 'todo_2';

  var options = {mechanisms: ['indexeddb', 'sqlite', 'websql']};

  /**
   * @type {ydn.db.Storage}
   */
  this.db = new ydn.db.Storage(db_name, schema, options);

  this.db.onReady(function(err) {
    if (err) {
      this.log('error ' + JSON.stringify(err));
      throw err;
    } else {
      this.log(this.db + ' ready');
    }
  }, this);

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


