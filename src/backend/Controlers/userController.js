// src/controllers/controllers.js
import db from '../db copy.js.js';


/* funções relacionadas a usercontrolls*/ 

// Funções para os pets
export const registerPet = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Arquivo da imagem não enviado.' });
        }

        const { Nome, Raca, Idade, Porte, Sexo, Descricao, user_id } = req.body;
        const filename = req.file.filename;
        const filePath = req.file.path;

        await db.execute(
            "INSERT INTO pet ( Nome, Raca, Idade, Porte, Sexo, Descricao, filename, filePath, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Nome, Raca, Idade, Porte, Sexo, Descricao, filename, filePath, user_id]
        );

        res.status(201).json({ message: "Pet cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listPets = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM pet');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pets' });
    }
};

export const deletePet = async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await db.execute('DELETE FROM pet WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        res.json({ message: 'Pet excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir pet' });
    }
};

// Funções para os agendamentos
export const scheduleTosa = async (req, res) => {
    try {
        const { horario, IdPet, servico, user_id, Descricao } = req.body;

        if (!horario || !IdPet || !servico || !user_id || !Descricao) {
            return res.status(400).json({ error: 'Dados incompletos. Verifique horário, pet, serviço e usuário.' });
        }

        await db.execute(
            'INSERT INTO agendamento (horario, IdPet, servico, user_id, Descricao) VALUES (?, ?, ?, ?, ?)',
            [horario, IdPet, servico, user_id, Descricao]
        );

        res.status(201).json({ message: 'Tosa agendada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao agendar tosa' });
    }
};

export const listAgendamentos = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM agendamento');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
};

export const deleteAgendamento = async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await db.execute('DELETE FROM agendamento WHERE id_agendamento = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        res.json({ message: 'Agendamento excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir agendamento' });
    }
};

export const updateAgendamento = async (req, res) => {
    try {
        const id = req.params.id;
        const { horario, IdPet, servico, user_id, Descricao } = req.body;

        if (!horario || !IdPet || !servico || !user_id || !Descricao) {
            return res.status(400).json({ error: 'Dados incompletos. Verifique horário, pet, serviço e usuário.' });
        }

        const [result] = await db.execute(
            'UPDATE agendamento SET horario = ?, IdPet = ?, servico = ?, user_id = ?, Descricao = ? WHERE id_agendamento = ?',
            [horario, IdPet, servico, user_id, Descricao, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        res.json({ message: 'Agendamento atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
};


