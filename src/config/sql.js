// import mysql from "mysql2/promise";

// async function connect() {
//   try {
//     let connection;

//     if (process.env.NODE_ENV === "production" && process.env.MYSQL_URI) {
//       // Cloud / production
//       connection = await mysql.createConnection(process.env.MYSQL_URI);
//     } else {
//       // Local setup
//       connection = await mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD,
//         database: process.env.MYSQL_DB,
//         port: process.env.MYSQL_PORT,
//       });
//     }

//     console.log("✅ Connected to MySQL");
//     return connection;
//   } catch (error) {
//     console.error("❌ Error connecting to MySQL:", error.message);
//     process.exit(1);
//   }
// }

// export default connect;
