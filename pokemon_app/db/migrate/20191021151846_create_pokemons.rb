class CreatePokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :poke_type
      t.string :move
      t.string :image
      t.integer :likes
      t.string :model_key
      t.string :size
      t.string :audio
      t.timestamps
    end
  end
end
