const { createBudget } = require('../controllers/budgetControllers');
const {
  createCategory,
  getCategories,
} = require('../controllers/categoryControllers');
const {
  createExpense,
  getExpenses,
  aggregateExpenses,
} = require('../controllers/expenseControllers');

module.exports = app => {
  app.post('/budget', (req, res) => {
    createBudget(req.body)
      .then(savedBudget => res.status(200).json(savedBudget))
      .catch(err => res.status(500).json(err));
  });

  app.get('/budget/:id/summary', (req, res) => {
    aggregateExpenses()
      .then(summary => res.status(200).json(summary))
      .catch(err => res.status(500).json(err));
  });

  app.post('/category', (req, res) => {
    createCategory(req.body)
      .then(savedCategory => res.status(200).json(savedCategory))
      .catch(err => res.status(500).json(err));
  });

  app.get('/category', (req, res) => {
    getCategories()
      .then(allCategories =>
        res.status(200).json(allCategories.map(category => category.title)),
      )
      .catch(err => res.status(500).json(err));
  });

  app.post('/expense', (req, res) => {
    createExpense(req.body)
      .then(createdExpense => res.status(200).json(createdExpense))
      .catch(err => res.status(500).json(err));
  });

  app.get('/expense', (req, res) => {
    getExpenses()
      .then(allExpenses => res.status(200).json(allExpenses))
      .catch(err => res.status(500).json(err));
  });
};
