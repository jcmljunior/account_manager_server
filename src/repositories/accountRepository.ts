import UserModel from "../models/userModel";
import pool from "../config/databaseConfig";
import bcrypt from "bcrypt";

interface UserResult {
  statusCode: number,
  message: string,
}

const createUser = async (user: UserModel): Promise<UserResult> => {
  let conn;

  try {
    conn = await pool.getConnection();
    const query = `INSERT INTO users (email, password, is_verified)
                   VALUES (?, ?, ?)`;
    const result = await conn.query(query, [user.email, user.password, user.isVerified]);
    await conn.commit();

    return {
      statusCode: 200,
      message: 'Usuário %s criado com sucesso!'.replace('%s', result.insertId),
    };
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }

    return {
      statusCode: 400,
      message: 'Erro ao criar usuário!',
    };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

const getUser = async (user: UserModel) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const query = `SELECT *
                   FROM users
                   WHERE email = ?
                   LIMIT 1`;
    const result = await conn.query(query, [user.email]);
    await conn.commit();

    if (result.length === 0) {
      return {
        statusCode: 404,
        message: 'Usuário não encontrado!',
      }
    }

    const isMatch = await bcrypt.compare(user.password!, result[0].password);

    if (!isMatch) {
      return {
        statusCode: 401,
        message: 'Senha inválida!',
      }
    }

    if (!result[0].is_verified) {
      return {
        statusCode: 401,
        message: 'Usuário não verificado!',
      }
    }

    return {
      statusCode: 200,
      message: 'Usuário %s encontrado com sucesso!'.replace('%s', result[0].id),
    };
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }

    return {
      statusCode: 400,
      message: 'Erro ao buscar usuário!',
    }
  }
};

const updateUser = (user: UserModel) => {
};

const deleteUser = (user: UserModel) => {
};

export {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  UserResult,
}
