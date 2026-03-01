import { listarTodosUsuarios, listarUsuarioPorId, criarUsuario, atualizarUsuario, removerUsuario } from '../services/usuarioService.js'

export async function listar(req, res) {
    try {
        const resultado = await listarTodosUsuarios();
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar usuario' });
    }
}

export async function listarPorId(req, res) {
    try {
        const { id } = req.params;
        const resultado = await listarUsuarioPorId(id);
        if (!resultado) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar usuario' });
    }
}

export async function criar(req, res) {
    try {
        const { nome, email, senha } = req.body;
        const resultado = await criarUsuario(nome, email, senha);
        res.status(201).json(resultado);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

export async function atualizar(req, res) {
    try {
        const { nome, email, senha } = req.body;
        const { id } = req.params;
        const resultado = await atualizarUsuario(id, nome, email, senha);
        if (!resultado) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

export async function remover(req, res) {
    try {
        const { id } = req.params;
        const resultado = await removerUsuario(id);
        if (!resultado) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao remover usuario' });
    }
}