
var sudoku = {

	gridSize : 9,
	
	resetGrid : function() {
		for(var row = 0; row < this.gridSize; row++) {
			for(var col = 0; col < this.gridSize; col++) {
				this.setNumberAt(row, col, '', true);
			}
		}
	},
	
	isGridValid : function() {
		for(var r = 0; r < this.gridSize; r++) {
			for(var c = 0; c < this.gridSize; c++) {
				var num = this.getNumberAt(r, c);
				if(num.length !== 0) {
					if (this.isNumberInRow(r, c, num) 
					 || this.isNumberInColumn(r, c, num)
					 || this.isNumberInSquare(r, c, num)) {
						return false;
					}
				}
			}
		}
		return true;
	},

	solve : function() {
		var cell = this.getNextAvailableCell();

		if(cell == null)
			return true;
						
		for (var num = 1; num <= this.gridSize; num++) {

			if (!this.isNumberInRow(cell.row, cell.col, num) 
			 && !this.isNumberInColumn(cell.row, cell.col, num) 
			 && !this.isNumberInSquare(cell.row, cell.col, num)) {

				this.setNumberAt(cell.row, cell.col, num);

				if (this.solve()) {
					return true;
				}

				this.setNumberAt(cell.row, cell.col, '');
			}
		}
		return false; 
	},
	
	getNextAvailableCell : function() {
		for(var r = 0; r < this.gridSize; r++) {
			for(var c = 0; c < this.gridSize; c++) {
				if(this.getNumberAt(r, c).length === 0) {
					return {row: r, col: c};
				}
			}
		}
		return null;
	},
		
	isNumberInRow : function(row, col, num) {
		for(var c = 0; c < this.gridSize; c++) {
			if(c != col && this.getNumberAt(row, c) == num) {
				return true;
			}
		}
		return false;
	},
		
	isNumberInColumn : function(row, col, num) {
		for(var r = 0; r < this.gridSize; r++) {
			if (r != row 
			 && this.getNumberAt(r, col) == num) {
				return true;
			}
		}
		return false;
	},
		
	isNumberInSquare : function(row, col, num) {
		var squareSize = this.gridSize / 3;

		var squareStartRow = row - row % squareSize;
		var squareStartCol = col - col % squareSize;
		
		for(var r = 0; r < squareSize; r++) {
			for(var c = 0; c < squareSize; c++) {
				if (squareStartRow + r != row 
				 && squareStartCol + c != col 
				 && this.getNumberAt(squareStartRow + r, squareStartCol + c) == num) {
					return true;
				}
			}
		}
		return false;
	},
	
	setNumberAt : function(row, col, num, triggerChange) {
		var input = $('#' + row + col);
		
		$(input).val(num);
		
		if(triggerChange)
			$(input).trigger('change');
	},
	
	getNumberAt : function(row, col) {
		return $('#' + row + col).val();
	}
};
