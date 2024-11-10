import express from 'express';
const router = express.Router();

// Rota GET para obter todos os estudantes
router.get('/', async (req, res) => {
  await req.app.locals.db.read();
  res.json(req.app.locals.db.data.students);
});

// Rota GET para obter um estudante por ID
router.get('/:id', async (req, res) => {
  await req.app.locals.db.read();
  const student = req.app.locals.db.data.students.find(st => st.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Rota POST para criar um novo estudante
router.post('/', async (req, res) => {
  await req.app.locals.db.read();
  const nextId = req.app.locals.db.data.students.length
    ? Math.max(...req.app.locals.db.data.students.map(st => st.id)) + 1
    : 1;
  const { name, course, year } = req.body;
  const newStudent = {
    id: nextId,
    name,
    course,
    year
  };
  req.app.locals.db.data.students.push(newStudent);
  await req.app.locals.db.write();
  res.status(201).json(newStudent);
});

// Rota PUT para atualizar um estudante por ID
router.put('/:id', async (req, res) => {
  await req.app.locals.db.read();
  const student = req.app.locals.db.data.students.find(st => st.id === parseInt(req.params.id));
  if (student) {
    Object.assign(student, req.body);
    await req.app.locals.db.write();
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Rota DELETE para excluir um estudante por ID
router.delete('/:id', async (req, res) => {
  await req.app.locals.db.read();
  const index = req.app.locals.db.data.students.findIndex(st => st.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedStudent = req.app.locals.db.data.students.splice(index, 1);
    await req.app.locals.db.write();
    //res.status(204).end();
    res.json(deletedStudent);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

export default router;
