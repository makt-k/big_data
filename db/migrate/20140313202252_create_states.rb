class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :name
      t.integer :pop_at_risk
      t.integer :reincarcerated
      t.float :percent
      t.string :abbrev

      t.timestamps
    end
  end
end
