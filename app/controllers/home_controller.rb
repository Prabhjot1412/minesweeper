class HomeController < ApplicationController
  @@won = false

  def index
    @@won = false
    MinesweeperService.minesweeper = []
    @row = 0
    @column = 0
  end

  def new
    render json: { value: MinesweeperService.get_value(params[:row],params[:column])}
  end

  def check_win_condition
    if @@won
      render json: { value: false }
      return
    end

    minesweeper = MinesweeperService.minesweeper
    coordinates = []
    minesweeper.each_with_index do |row,index1|
      row.each_with_index do |column,index2|
        coordinates << "#{index1}#{index2}"if column == 'm'
      end
    end
    
    if coordinates == params[:array_of_mines]
      @@won = true
      render json: {value: true}
    else
      render json: {value: false}
    end
  end
end
