import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Criar um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - phone
   *               - position
   *               - birthDate
   *               - message
   *             properties:
   *               name:
   *                 type: string
   *                 example: "João Silva"
   *                 description: "Nome completo (obrigatório, 2-255 caracteres)"
   *               email:
   *                 type: string
   *                 example: "joao.silva@exemplo.com"
   *                 description: "Email válido (obrigatório)"
   *               phone:
   *                 type: string
   *                 example: "+5511999999999"
   *                 description: "Telefone brasileiro válido (obrigatório)"
   *               position:
   *                 type: string
   *                 example: "Desenvolvedor"
   *                 description: "Cargo (obrigatório, 2-255 caracteres)"
   *               birthDate:
   *                 type: string
   *                 format: date
   *                 example: "1990-05-15"
   *                 description: "Data de nascimento válida no formato YYYY-MM-DD (obrigatório)"
   *               message:
   *                 type: string
   *                 example: "Olá, esta é uma mensagem de teste"
   *                 description: "Mensagem (obrigatório, 10-1000 caracteres)"
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Dados inválidos
   *       500:
   *         description: Erro interno do servidor
   */
  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  };

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Obter todos os usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   email:
   *                     type: string
   *                   phone:
   *                     type: string
   *                   position:
   *                     type: string
   *                   birthDate:
   *                     type: string
   *                   message:
   *                     type: string
   *                   createdAt:
   *                     type: string
   *                   updatedAt:
   *                     type: string
   *       500:
   *         description: Erro interno do servidor
   */
  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Obter usuário por ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de usuário inválido' });
        return;
      }

      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  };

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Atualizar usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: "Nome completo (2-255 caracteres)"
   *               email:
   *                 type: string
   *                 description: "Email válido"
   *               phone:
   *                 type: string
   *                 description: "Telefone brasileiro válido"
   *               position:
   *                 type: string
   *                 description: "Cargo (2-255 caracteres)"
   *               birthDate:
   *                 type: string
   *                 format: date
   *                 description: "Data de nascimento válida (YYYY-MM-DD)"
   *               message:
   *                 type: string
   *                 description: "Mensagem (10-1000 caracteres)"
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de usuário inválido' });
        return;
      }

      const userData: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Usuário não encontrado') {
          res.status(404).json({ error: error.message });
        } else {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  };

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Excluir usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       204:
   *         description: Usuário excluído com sucesso
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de usuário inválido' });
        return;
      }

      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  };
}