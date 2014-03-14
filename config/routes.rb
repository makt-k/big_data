BigData::Application.routes.draw do
  get "states/index"
  root "state#index"
end
