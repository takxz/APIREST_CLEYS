const Joi = require('joi');

const createProductSchema = Joi.object({
    nom: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(255).required(),
    prix: Joi.number().positive().required(),
    categorie: Joi.string().max(100).required()
});


const updateProductSchema = createProductSchema.fork(['nom', 'description', 'prix', 'categorie'], (field) => field.optional());

module.exports = {
    createProductSchema,
    updateProductSchema
};