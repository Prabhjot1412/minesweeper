import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    let boxes = document.getElementsByClassName("boxes")
    
    let boxes2 = Array.prototype.slice.call(boxes)
    boxes2.forEach(function(currentValue) {
      currentValue.addEventListener("contextmenu", function(e) {
        e.preventDefault()
        if (e.target.classList.contains('fa-square-full')) {
          e.target.classList.add('fa-flag');
          e.target.classList.remove('fa-square-full');
        } else if (e.target.classList.contains('fa-flag')) {
          e.target.classList.remove('fa-flag');
          e.target.classList.add('fa-square-full');
        }  
      });
    });
  }

  clicked(event) {
    let row_and_column = event.target.id

    $.getJSON("home/new",{ row: row_and_column[0], column: row_and_column[1] }, function(data) {
      if (data.value === 'm') {
        event.target.classList.remove('fa-square-full','fa-regular');
        event.target.classList.add('fa-solid', 'fa-bomb');
        event.target.style.color = 'red';

        Array.prototype.slice.call(document.getElementsByClassName('boxes')).forEach(function(currentValue) {
          currentValue.classList.add('disabled');
        });
      } else if (data.value === 0) {
        event.target.classList.remove('fa-square-full','fa-regular');
        event.target.classList.add('fa-solid', ('fa-'+data.value) );
        let coordinates = parseInt(row_and_column)
        let arr = []
        if ( (coordinates - 10) >= 0 && (parseInt(row_and_column[1]) > 0) ) {
          arr.push(coordinates - 11)
        }
        if ( (coordinates - 10) >= 0 ) {
          arr.push(coordinates - 10)
        }
        if ( (coordinates - 10) >= 0 && (parseInt(row_and_column[1]) < 8) ) {
          arr.push(coordinates - 10 + 1)
        }
        if ( (parseInt(row_and_column[1]) -1) >= 0 ) {
          arr.push(coordinates - 1)
        }
        if ( (coordinates + 10) <= 88 && (parseInt(row_and_column[1]) -1) >=0 ) {
          arr.push(coordinates + 10 -1)
        }
        if ( (parseInt(row_and_column[0]) +1) <= 8 ) {
          arr.push(coordinates + 10)
        }
        if ( (parseInt(row_and_column[0]) +1) <= 8 && (parseInt(row_and_column[1]) +1)  <= 8 ) {
          arr.push(coordinates + 10 +1)
        }
        if ( (parseInt(row_and_column[1]) +1) <= 8) {
          arr.push(coordinates +1)
        }
        arr.forEach(function (currentValue) {
          let value = currentValue.toString()
          if (currentValue <= 9) {
            value = '0'+ currentValue.toString()
          }
          let element = document.getElementById(value.toString())
          if ( element.classList.contains('fa-square-full') ) {
            element.click()
          }
        })
      } else {
        event.target.classList.remove('fa-square-full','fa-regular');
        event.target.classList.add('fa-solid', ('fa-'+data.value) );

        // check victory condition
        let unselected_boxes = Array.prototype.slice.call(document.getElementsByClassName("fa-square-full"))
        let flaged_boxes = Array.prototype.slice.call(document.getElementsByClassName("fa-flag"))
        let all_boxes =  unselected_boxes.concat(flaged_boxes)
        let ids = []
        all_boxes.forEach(function(currentValue) {
          ids.push(currentValue.id)
        });
        ids.sort()
        $.get("home/check_win_condition", {array_of_mines: ids}, function(data) {
          if (data.value) {
            all_boxes.forEach(function (currentValue) {
              currentValue.classList.add('won')
            });
          }
        });
      }
    });
  }
}
