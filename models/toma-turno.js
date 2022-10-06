const { Schema, model } = require('mongoose');
const Calendario = require('../models/calendario');
const Planilla = require('../models/planilla');

const Empty1 = new Schema({ any: [] });

const cal = new Calendario({});

const TomaTurnoSchema = Schema({
    fechaInicio: {
        type: String,
        required: true,
        maxLength: 100,
        lowercase: true,
        trim: true,
        unique: true
    },
    fechaTermino: {
        type: String,
        required: true,
        maxLength: 250,
        trim: true
    },
    calendario: [Empty1],
    planilla: [Empty1],
}, { collection: 'toma-turno' });

TomaTurnoSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('TomaTurno', TomaTurnoSchema);