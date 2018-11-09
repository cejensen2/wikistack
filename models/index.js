const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title : {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.beforeValidate((pageInstance)=>{
    pageInstance.slug = pageInstance.title.replace(/\s+/g, '_').replace(/\W/g, '');
})

module.exports = {
  db, Page, User
}
