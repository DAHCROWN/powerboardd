// db.js

const db = {};
const updateListeners = [];

export function addUpdateListener(listener) {
  updateListeners.push(listener);
}

function notifyUpdateListeners() {
  updateListeners.forEach(listener => listener());
}

export function upload_data(props) {
  db[props.id] = props;
  notifyUpdateListeners();
}

export function updatePowerHistory(props) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  db[props.id][String(timestamp)] = props;
  notifyUpdateListeners();
}

export default function db_query(id) {
  const res = db[id];
  if (res) {
    return res;
  } else {
    // Your default data structure
    const testHistory = {
      timestamp: 0,
      gen_history: 10,
      con_history: 20,
    };
    const childNodeProp = {
      id: "Mechatronics Laboratory 2",
      netConsumption: 89,
      status: "Paid",
    };

    const childNodeProp2 = {
      id: "AI4CE 2",
      netConsumption: 89,
      status: "Paid",
    };
    const test = {
      id: id,
      gen_current: 1,
      gen_voltage: 2,
      con_current: 3,
      con_voltage: 4,
      history: [testHistory],
      childNodes: [childNodeProp, childNodeProp2],
    };
    return test;
  }
}

export function fetchDB() {
  return db;
}
