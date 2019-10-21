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
        hash = JSON.parse(request.raw_post)
        @pokemon.update(hash)
        render json:@pokemon
    end
end
