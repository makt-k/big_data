class StateSerializer < ActiveModel::Serializer
  # render the attributes that we picked below in json
  attributes :name, :pop_at_risk, :reincarcerated, :percent, :abbrev, :fill_color

  def fill_color

  case object.percent
    when 0..8 then
      "LOW"
    when 9..16 then
      "MEDIUM"
    else
      "HIGH"
    end
  end
end
