require_relative "../import_data.rb"

namespace :import do
  desc "Import my data"
  # task is a method
  # invoke the environment task before this "data" task
  # make models...etc available to the ruby we'll write in this task
  task data: :environment do
    ImportData.import
  end

  desc "Clear DB State data"
  task clear_states: :environment do
    State.delete_all
  end
end
