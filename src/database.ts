import * as mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Arvin102007',
  database: 'Flight_Reservation_System',
});