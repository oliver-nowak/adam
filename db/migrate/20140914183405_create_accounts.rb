class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.integer :key,               null:false
      t.string :vcode,              null:false
      t.integer :access_mask,       null:true
      t.string :type,               null:true
      t.string :expires,            null:true
      t.integer :character_id,      null:true
      t.string :character_name,     null:true
      t.integer :corporation_id,    null:true
      t.string :corporation_name,   null:true
      t.integer :alliance_id,       null:true
      t.string :alliance_name,      null:true
      t.integer :faction_id,        null:true
      t.string :faction_name,       null:true

      t.timestamps
    end
  end
end
