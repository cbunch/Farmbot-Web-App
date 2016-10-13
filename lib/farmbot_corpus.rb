FarmbotCorpus = CeleryScript::Corpus
    .new
    .addParam(:x, [Fixnum])
    .addParam(:y, [Fixnum])
    .addParam(:z, [Fixnum])
    .addParam(:speed, [Fixnum])
    .addParam(:pin_number, [Fixnum])
    .addParam(:pin_value, [Fixnum])
    .addParam(:pin_mode, [Fixnum])
    .addParam(:data_label, [String])
    .addParam(:data_value, [String])
    .addParam(:data_type, [String])
    .addParam(:milliseconds, [Fixnum])
    .addParam(:message, [String])
    .addParam(:sub_sequence_id, [Fixnum])
    .addParam(:lhs, [String])
    .addParam(:op, [String])
    .addParam(:rhs, [Fixnum])
    .addNode(:var_get, [:data_label])
    .addNode(:var_set, [:data_label, :data_type, :data_value])
    .addNode(:move_absolute, [ :x, :y, :z, :speed])
    .addNode(:move_relative, [ :x, :y, :z, :speed ])
    .addNode(:write_pin, [ :pin_number, :pin_value, :pin_mode ])
    .addNode(:read_pin, [ :pin_number, :data_label]) # TODO: Needs pin_mode, also
    .addNode(:wait, [ :milliseconds ])
    .addNode(:send_message, [ :message ])
    .addNode(:execute, [ :sub_sequence_id ])
    .addNode(:if_statement, [ :lhs, :op, :rhs, :sub_sequence_id ])
