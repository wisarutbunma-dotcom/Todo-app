// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
let tasks = JSON.parse(FileManager.local().readString("tasks.json") || "[]");

function save() {
  FileManager.local().writeString("tasks.json", JSON.stringify(tasks));
}

// เพิ่มงาน
async function addTask() {
  let alert = new Alert();
  alert.title = "เพิ่มงาน";

  alert.addTextField("ชื่องาน");
  alert.addTextField("เวลา (YYYY-MM-DD HH:MM)");

  alert.addAction("บันทึก");
  await alert.present();

  let text = alert.textFieldValue(0);
  let time = alert.textFieldValue(1);

  tasks.push({ text, time, done:false });
  save();

  scheduleNotification(text, time);
}

// แจ้งเตือน
function scheduleNotification(text, time) {
  let n = new Notification();
  n.title = "งานที่ต้องทำ";
  n.body = text;
  n.schedule(new Date(time));
}

// แสดงรายการ
async function showTasks() {
  let alert = new Alert();
  alert.title = "ToDo List";

  tasks.forEach((t, i) => {
    alert.addAction(`${t.done ? "✅" : "⏳"} ${t.text}`);
  });

  alert.addCancelAction("ปิด");
  await alert.present();
}

// เริ่ม
let menu = new Alert();
menu.title = "ToDo Menu";
menu.addAction("ดูงาน");
menu.addAction("เพิ่มงาน");

let choice = await menu.present();

if (choice === 0) await showTasks();
if (choice === 1) await addTask();