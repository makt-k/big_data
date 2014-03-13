class StateSerializer < ActiveModel::Serializer
  # render the attributes that we picked below in json
  attributes :name, :pop_at_risk, :reincarcerated, :percent, :abbrev
end
