var todoFormButton = document.getElementsByTagName("button")[0];

todoFormButton.addEventListener("click", function (e) {
  var todoList = document.querySelector(".todo-list");
  var newTodoText = document.querySelector("input").value;
  var newTodoListItem = document.createElement("li");
  var div1 = document.createElement("div");
  div1.classList.add("item-main");
  var div2 = document.createElement("div");
  div2.classList.add("item-edit");
  var newTodoCheckBox = document.createElement("input");
  newTodoCheckBox.type = "checkbox";
  // span for containing todo text and inupt
  var newTodoInput = document.createElement("input");
  newTodoInput.type = "text";
  newTodoInput.disabled = true;
  newTodoInput.value = newTodoText;
  // kick off the contents into first div
  div1.appendChild(newTodoCheckBox);
  div1.appendChild(newTodoInput);
  // kick off the image in second div
  var image = document.createElement("img");
  image.src = "edit.svg";
  div2.appendChild(image);
  // kick off the contents into li
  newTodoListItem.classList.add("todo-list-item");
  newTodoListItem.appendChild(div1);
  newTodoListItem.appendChild(div2);
  todoList.appendChild(newTodoListItem);

  var todoItems = document.querySelectorAll(".item-main");
  for (var todoItem of todoItems) {
    todoItem.addEventListener("click", function () {
      this.parentElement.classList.add("flipOutX");
      this.parentElement.style.textDecoration = "line-through";
      this.querySelector("input").checked = true;
      setTimeout(() => {
        this.parentElement.remove();
      }, 750);
    });

    var editIcons = document.querySelectorAll(".item-edit");
    for (var editIcon of editIcons) {
      editIcon.addEventListener("click", function () {
        this.previousSibling.lastElementChild.disabled = false;
        this.previousSibling.lastElementChild.focus();
        this.previousSibling.lastElementChild.addEventListener(
          "focusout",
          function () {
            this.disabled = true;
          }
        );
      });
    }
  }
});
