class StatesController < ApplicationController

  def index

    states = State.all
    # root: false gets rid of the outside array of hashes under the key "states"
    render json: states, root: false

  end
end
