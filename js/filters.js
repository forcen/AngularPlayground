/* globals angular */

'use strict';

/* Filters */

/**
 * apply a different style to the transaction type cell
 * based in the transaction type.
 */
angular.module('widgetTransactionsFilters', [])
.filter('transactionType', function() {
	return function(input) {
		var strClass = 'type-0';

		switch(input) {
			case 'Payment Credit Card':
				strClass = 'type-1';
				break;
			case 'Cash Withdrawl':
				strClass = 'type-2';
				break;
			case 'Bill Payment':
				strClass = 'type-3';
				break;
			case 'Salary':
				strClass = 'type-4';
				break;
			case 'Online Transfer':
				strClass = 'type-5';
				break;
		}
		return strClass;
	};
});