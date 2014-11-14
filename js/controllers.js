/* globals angular, alert */

'use strict';

/* Controllers for Transactions widget */

angular.module('widgetTransactionsControllers', [])
.controller('transactionsListCtrl', 
	['$scope', '$http', 'transactionsServer', 'disputesServer',
	function($scope, $http, objTransactions, objDisputes) {
	/**
	 * returns the list of transactions, optionally ordered by column
	 *
	 * @todo the json is already ordered by amount. the interface must show that the data is ordered.
     * 
	 * @param  {Event} objEvent the optional Event the method will use to access the item
	 *                          where the user clicked on
	 */
	$scope.getOrderedFromHeader = function (objEvent) {
		$scope.getOrderedBy(objEvent ? objEvent.target.dataset.orderby : null);

		// update the interface
		if(objEvent) {
			$scope.clearHeader(objEvent);
			angular.element(objEvent.target).addClass('ordered');
		} 
	};

	$scope.getOrderedByFromMenu = function () {
		$scope.getOrderedBy($scope.orderBy.param);
	};

	/**
	 * instead of using orderby directive I want to get the results ordered from server
	 * @param  {String} strOrder optional
	 */
	$scope.getOrderedBy = function (strOrder) {
		objTransactions
			.get(strOrder)
			.then(function(data) {
				$scope.transactions = data;
			});
	};

	/**
	 * removes the ordered class from all elements in the header
	 * @param  {Event} objEvent the raw event
	 */
	$scope.clearHeader = function (objEvent) {
		var arrElements = objEvent.target.parentNode.childNodes,
			len = arrElements.length,
			i;
	
		for(i = 0; i < len; i++) {
			angular.element(arrElements[i]).removeClass('ordered');
		}
	};

	/**
	 * starts the process of opening a dispute and updates the interface
	 * 
	 * @param  {String} strID the id of the transaction to dispute
	 */
	$scope.openDispute = function(strID){
		var len = $scope.transactions.length,
			i;

		objDisputes
			.doDispute(strID)
			.then(function (result) {
						alert(result);
					}
			);

		// additionally, mark the transaction in the local data in order for the interface to display the change
		for(i = 0; i < len; i++) {
			if($scope.transactions[i].id === strID) {
				$scope.transactions[i].disputed = true;			
				break;
			}
    	}
    };

	$scope.orderValues = [
		{param: 'counterpartyName', label: 'Counterparty'},
		{param: 'transactionType', label: 'Type'},
		{param: 'transactionAmount', label: 'Amount'},
		{param: 'bookingDateTime', label: 'Date'}
	];

	$scope.orderBy = $scope.orderValues[2];

    // load initial data
    $scope.getOrderedBy();
}]);