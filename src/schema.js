const { Schema, mongo } = require('mongoose');

const tallySchema = new Schema({
    userName: Schema.Types.String,
    roles: [Schema.Types.String],
})

exports.tallySchema = tallySchema;
