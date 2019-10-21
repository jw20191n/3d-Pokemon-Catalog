class PokemonController < ApplicationController
    def index 
        @pokemons = Pokemon.all
        render json:@pokemons
    end

    def show
        @pokemon = Pokemon.find(params[:id])
        render json:@pokemon
    end

    def update
        @pokemon = Pokemon.find(params[:id])
        @new_likes = @pokemon.likes + 1
        @pokemon.update(likes: @new_likes)
        #hash = JSON.parse(@pokemon)
       # @pokemon.update(hash)
        render json:@pokemon
    end
end
