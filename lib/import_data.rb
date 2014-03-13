# the csv library comes with ruby
require 'csv'
require 'states'

class ImportData
  def self.import
    # Rails.root is the full path of the root of your current project
    data = CSV.read("#{Rails.root}/data/ppus07st06.csv")
    # should return array which we will iterate through
    data.each do |row|
      if row[1].present? && STATE_NAMES.include?(row[1].strip)
        # take out the nils from the arrays
        row.compact!
        # strip white space
        row[0].strip!
        state_abbrev = STATES[row[0]]
        puts "State row is #{row}"
        # sinking data into our Rails database
        State.create!(
          name: row[0],
          pop_at_risk: row[1].gsub(/,/,'').to_i,
          reincarcerated: row[2].gsub(/,/,'').to_i,
          percent: row[3].to_f,
          abbrev: state_abbrev)
      end
    end
  end
end
