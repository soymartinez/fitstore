// import { connect, connection } from 'mongoose'

// const conn = {
//   isConnected: false,
// };

// export function dbConnect() {
//   if (conn.isConnected) return;

//   const db = connect(process.env.MONGODB_URI);

//   conn.isConnected = db.connections;
// }

// connection.on("connected", () => {
//   console.log("Mongodb connected to db");
// });

// connection.on("error", (err) => {
//   console.error("Mongodb connected to", err.message);
// });