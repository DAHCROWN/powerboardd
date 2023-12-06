let db = {};
const powerHistoryDB = {}
const childrenDB = {}


db['test'] = {
    id: 'test', 
    gen_current: 10,
    gen_voltage: 11,
    con_current: 12,
    con_voltage: 13,
}

// interface IDB{
//     id: any, 
//     gen_current: Number 
//     gen_voltage: Number,
//     con_current: Number,
//     con_voltage: Number,
//     history: PowerHistory[]
// }
// interface PowerHistory{
//     timestamp: Number,
//     gen_history: Number, 
//     con_history: Number
// }

export function upload_data(props){
    console.log("props:",props)
    db[props.id] = props
}

export function updatePowerHistory(props){
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    db[props.id][String(timestamp)] = props
}



export default function db_query(id){
    const res =  db[id]
    if (res){
        return res
    } else {
        const testHistory = {
            timestamp: 0,
            gen_history: 10,
            con_history: 20
        }
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
        const test= {
            id: id,
            gen_current: 1, 
            gen_voltage: 2,
            con_current: 3,
            con_voltage: 4, 
            history: [testHistory],
            childNodes: [childNodeProp, childNodeProp2]
        }
        return test
    }
}

export function fetchDB(){
    return db
}