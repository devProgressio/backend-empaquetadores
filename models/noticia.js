const { Schema, model } = require('mongoose');

const NoticiaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    glosa: {
        type: String,
        required: true
    },
    fechaHoraCreacion: {
        // Esta fecha hora deberia ser automatica al grabar la fecha.
        type: Date,
        default: Date.now
    },
    img: {
        type: String
    },
    importancia: {
        type: String,
        required: true,
        enum: ['BAJA', 'MEDIA', 'ALTA'],
        default: 'BAJA'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    activaHasta: {
        type: Date,
        requiered: true
    }
}, { collection: 'noticia' });

NoticiaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Noticia', NoticiaSchema);