module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reoccuring: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }, 
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Expense;
};