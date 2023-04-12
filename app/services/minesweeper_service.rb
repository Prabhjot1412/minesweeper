class MinesweeperService
  @@minesweeper = []

  def initialize(row, column)
    i = 0
    9.times do
      col = 0
      @@minesweeper.push([])
      9.times do 
        input = (rand(30) < 5) && check_first_click([i,col], [row,column])  ? 'm' : 0
        @@minesweeper[i].push(input)
        col += 1
      end
      i+=1
    end
  end

  def check_first_click(ar1, ar2)
    ar2 = [ar2[0].to_i,ar2[1].to_i]
    !(ar1 == ar2 || ar1 == [ar2[0]+1,ar2[1]] || ar1 == [ar2[0]+1,ar2[1]-1] || ar1 == [ar2[0]+1,ar2[1]+1] || ar1 == [ar2[0],ar2[1]+1] || ar1 == [ar2[0]-1,ar2[1] +1] || ar1 == [ar2[0] -1 ,ar2[1]] || ar1 == [ar2[0]-1,ar2[1]-1] || ar1 == [ar2[0],ar2[1]-1])
  end

  class << self
    def generate(row, column)
      minesweeper = MinesweeperService.new(row, column)
      @@minesweeper.each_with_index do |value, index|
        value.each_with_index do |value2, index2|
          add_adjacent_unless_m(index,index2) if value2 == 'm'
        end
      end
    end

    def get_value(row, column)
      generate(row, column) if @@minesweeper.blank?
      @@minesweeper[row.to_i][column.to_i]
    end

    def minesweeper= (value)
      @@minesweeper = value
    end

    def minesweeper
      @@minesweeper
    end

    private

    def add_adjacent_unless_m(row,column)
     @@minesweeper[row -1][column] += 1 if row != 0 && @@minesweeper[row -1][column] != 'm'
     @@minesweeper[row +1][column] += 1 if row < 8 && @@minesweeper[row +1][column] != 'm'
     @@minesweeper[row -1][column-1] += 1 if row != 0 && column != 0 && @@minesweeper[row -1][column-1] != 'm'
     @@minesweeper[row -1][column+1] += 1 if row != 0 && column < 8 && @@minesweeper[row -1][column+1] != 'm'
     @@minesweeper[row][column -1] += 1 if column != 0 && @@minesweeper[row][column -1] != 'm'
     @@minesweeper[row+1][column -1] += 1 if column != 0 && row < 8 && @@minesweeper[row+1][column -1] != 'm'
     @@minesweeper[row +1][column +1] += 1 if column < 8 && row < 8 && @@minesweeper[row+1][column +1] != 'm'
     @@minesweeper[row][column +1] += 1 if column < 8 && @@minesweeper[row][column +1] != 'm'
    end
  end
end