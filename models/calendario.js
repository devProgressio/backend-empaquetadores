const { Schema, model } = require('mongoose');

const CalendarioSchema = Schema({

    planillaId: {
        type: Schema.Types.ObjectId,
        ref: 'Planilla',
        required: true
    },
    fechaHoraInicio: {
        type: Date,
        required: true
    },
    fechaHoraTermino: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
}, { collection: 'calendario' });

CalendarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Calendario', CalendarioSchema);