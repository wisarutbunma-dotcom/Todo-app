function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value === "") return;

  const li = document.createElement("li");

  const text = document.createElement("span");
  text.textContent = input.value;

  const del = document.createElement("button");
  del.textContent = "ลบ";
  del.onclick = () => li.remove();

  text.onclick = () => {
    text.style.textDecoration = "line-through";
  };

  li.appendChild(text);
  li.appendChild(del);

  document.getElementById("list").appendChild(li);

  input.value = "";
}
