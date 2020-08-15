$(document).ready(function () {
  let fetchedTodos;
  var todoFormButton = document.getElementsByTagName("button")[0];

  firebase
    .database()
    .ref("todos")
    .on("value", function (data) {
      fetchedTodos = data.val();
      $(".todo-list").empty();

      for (let todo in fetchedTodos) {
        let todoText = fetchedTodos[todo];
        let markup = `<li class='todo-list-item'>
          <div class='item-main'>
            <input id=${todo} type='checkbox'/>
              <input type='text' disabled value='${todoText}' />
            </label>
          </div>
          <div class='item-edit'>
            <img src='edit.svg' />
          </div>
        </li>`;

        $(".todo-list").append(markup);
      }

      $("input[type='checkbox']").on("click", function () {
        let todoListItem = $(this).parents(".todo-list-item");
        let id = todoListItem.find("input[type='checkbox']").attr("id");
        firebase.database().ref(`todos/${id}`).remove();
        todoListItem.addClass("flipOutX");
        todoListItem
          .find("input[type='text'")
          .css("text-decoration", "line-through");
        setTimeout(() => {
          todoListItem.remove();
        }, 750);
      });
      $(".item-edit").on("click", function () {
        let inputField = $(this)
          .parents(".todo-list-item")
          .find("input[type='text']");
        console.log(inputField);
        inputField.attr("disabled", false);
        inputField.focus();
      });
      $("input[type='text']").on("focus", function () {
        $(this)[0].setSelectionRange(100, 100);

        $("input[type='text']").on("focusout", function () {
          let todoListItem = $(this).parents(".todo-list-item");
          let id = todoListItem.find("input[type='checkbox']").attr("id");
          let valueChanged = todoListItem.find("input[type='text']").val();
          firebase.database().ref(`todos/${id}`).set(valueChanged);
        });
      });
    });
  $("button").on("click", function (e) {
    let todo = $("input[type='text']").val();
    firebase.database().ref("todos/").push(todo);
    // $("input[type='text']:first").val("");
  });
});
