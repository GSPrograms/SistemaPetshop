import express from 'express'
import authRoutes from './authroutes.js'
import db from '../db copy.js.js'
import multer from 'multer'
import upload from '../uploadconfig.js'


const router = express.Router()

router.post('/RegistrarPet', upload.single('imagem'), async (req, res) => {
    try {
        console.log("pegando os dados");

        if (!req.file) {
            console.error('Arquivo não enviado!');
            return res.status(400).json({ error: 'Arquivo da imagem não enviado.' });
        }

        const { Nome, Raca, Idade, Porte, Sexo, Descricao, user_id} = req.body;
        const filename = req.file.filename;
        const filePath = req.file.path;

        console.log("Dados recebidos:", { Nome, Raca, Idade, Porte, Sexo, Descricao, filename, filePath, user_id });

        await db.execute(
            "INSERT INTO pet ( Nome, Raca, Idade, Porte, Sexo, Descricao, filename, filePath, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Nome, Raca, Idade, Porte, Sexo, Descricao, filename, filePath, user_id]
        );

        res.status(201).json({ message: "Pet cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro no registro do pet:", error); // <--- imprima o erro aqui
        res.status(500).json({ error: error.message });
    }
});

router.get('/pets', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM pet');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        res.status(500).json({ error: 'Erro ao buscar pets' });
    }
});

// Rota DELETE para excluir um pet pelo ID
router.delete('/petdelete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await db.execute('DELETE FROM pet WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        res.json({ message: 'Pet excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir pet:', error);
        res.status(500).json({ error: 'Erro ao excluir pet' });
    }
});

router.get('/usuario', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM cliente');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

router.post('/agendarTosa', async (req, res) => {
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
        console.error('Erro ao agendar tosa:', error);
        res.status(500).json({ error: 'Erro ao agendar tosa' });
    }
});


router.get('/agendamentos', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM agendamento');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});


router.delete('/agendamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await db.execute('DELETE FROM agendamento WHERE id_agendamento = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        res.json({ message: 'Agendamento excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        res.status(500).json({ error: 'Erro ao excluir agendamento' });
    }
});

router.put('agendamentos/:id', async (req, res) => {
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
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
});

router.get('/Agendamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute('SELECT * FROM agendamento WHERE id_agendamento = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Agendamento nao encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

router.put('EditarAgendamento/:id', async (req, res) => {
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
            return res.status(404).json({ error: 'Agendamento nao encontrado' });
        }

        res.json({ message: 'Agendamento atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
});


    
router.use(authRoutes)

export default router