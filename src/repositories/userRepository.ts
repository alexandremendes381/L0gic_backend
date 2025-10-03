import { database } from '../config/database';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user';

export class UserRepository {
  private db = database.getDatabase();

  async createUser(userData: CreateUserRequest): Promise<User> {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (name, email, phone, position, birthDate, message)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      this.db.run(
        query,
        [userData.name, userData.email, userData.phone, userData.position, userData.birthDate, userData.message],
        function (err) {
          if (err) {
            reject(err);
          } else {
            database.getDatabase().get(
              'SELECT * FROM users WHERE id = ?',
              [this.lastID],
              (err, row) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(row as User);
                }
              }
            );
          }
        }
      );
    });
  }

  async getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users ORDER BY createdAt DESC';
      
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as User[]);
        }
      });
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as User || null);
        }
      });
    });
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(userData).filter(key => userData[key as keyof UpdateUserRequest] !== undefined);
      if (fields.length === 0) {
        this.getUserById(id).then(resolve).catch(reject);
        return;
      }

      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const values = fields.map(field => userData[field as keyof UpdateUserRequest]);
      
      const query = `
        UPDATE users 
        SET ${setClause}, updatedAt = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;
      
      this.db.run(query, [...values, id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          database.getDatabase().get(
            'SELECT * FROM users WHERE id = ?',
            [id],
            (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row as User);
              }
            }
          );
        }
      });
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      
      this.db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as User || null);
        }
      });
    });
  }
}