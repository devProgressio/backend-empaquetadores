const { Schema, model } = require('mongoose');

const FaltaSchema = Schema({

    nombre: {
        type: String,
        required: true,
        maxLength: 100,
        lowercase: true,
        trim: true,
        unique: true
    },
    glosa: {
        type: String,
        required: true,
        maxLength: 250,
        trim: true
    },
    gravedad: {
        type: String,
        required: true,
        enum: ['BAJA', 'MEDIA', 'ALTA'],
        default: 'BAJA'
    },
}, { collection: 'falta' });

FaltaSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Falta', FaltaSchema);