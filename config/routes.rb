Rails.application.routes.draw do
  resources :home, only: %i[index new] do
    collection do
      get :check_win_condition     
    end
  end
  root 'home#index'
end
