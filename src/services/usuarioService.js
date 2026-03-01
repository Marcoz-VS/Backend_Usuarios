import { pool } from '../database/db.js'
import validator from 'validator';
import bcrypt from 'bcrypt';

export async function listarTodosUsuarios() {
    try {
        const resultado = await pool.query('SELECT id, nome, email, created_at FROM usuarios');
        return resultado.rows;
    } catch (err) {
        throw err;
    }
}

export async function listarUsuarioPorId(id) {
    try {
        const resultado = await pool.query('SELECT id, nome, email, created_at FROM usuarios WHERE id = $1', [id]);
        return resultado.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function criarUsuario(nome, email, senha) {
    try{
        if (!validator.isEmail(email)) {
            throw new Error('Email inválido');
        }
        if (senha.length <= 5) {
            throw new Error('Senha inválido');
        }
        const existente = await pool.query('SELECT id FROM usuarios WHERE email = $1 ', [email]);
        if (existente.rows.length > 0) {
            throw new Error('Email duplicado');
        }
        const hash = await bcrypt.hash(senha, 10);
        const resultado = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, created_at',
            [nome, email, hash]
        );
        return resultado.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function removerUsuario(id) {
    try {
        const resultado = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id, nome, email', [id]);
        return resultado.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function atualizarUsuario(id, nome, email, senha) {
    try {
        const usuarioAtual = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (!usuarioAtual.rows[0]) {
            throw new Error('Usuário não encontrado');
        }
        const atual = usuarioAtual.rows[0];
        let nomeAtualizado = nome || atual.nome;
        let emailAtualizado = email || atual.email;
        let senhaAtualizado = senha || atual.senha;

        if (email && !validator.isEmail(emailAtualizado)) {
            throw new Error('Email inválido');
        }

        if (email && email !== atual.email) {
            const existente = await pool.query('SELECT id FROM usuarios WHERE email = $1 ', [email]);
            if (existente.rows.length > 0) {
                throw new Error('Email duplicado');
            }
        }

        if (senha) {
            if (senha.length <= 5) {
                throw new Error('Senha inválida');
            }
            senhaAtualizado = await bcrypt.hash(senha, 10);
        }

        const resultado = await pool.query(
            'UPDATE usuarios SET nome=$1, email=$2, senha=$3 WHERE id=$4 RETURNING id, nome, email, created_at',
            [nomeAtualizado, emailAtualizado, senhaAtualizado, id]
        );

        return resultado.rows[0];
    } catch (err) {
        throw err;
    }
}