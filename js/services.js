/* global angular */

'use strict';

angular.module('widgetTransactionsServices', [])
.factory('transactionsServer', 
	['$http', function ($http, $q) {

	    /**
	     * launchs the dispute to the server
	     * 
	     * @param  {String} strID the id of the transaction to dispute
	     */
    	function get (strOrder) {
    		var request = $http({
			    				method: 'get',
		                        url: '../../api/transactions' + (strOrder ? '?sort=' + strOrder : '')
		                    });

    		return request.then(handleSuccess, handleError);
		}

		function handleSuccess (result) {
			return result.data;
		}

		function handleError( result ) {
			if (!angular.isObject(result.data) || !result.data.message) {
				return $q.reject('An unknown error occurred.');
			}
			return $q.reject(result.data.message);
		}

		return {
			get: get
		};
}])
.factory('disputesServer', 
	['$http', function ($http, $q) {

	    /**
	     * launchs the dispute to the server
	     * 
	     * @param  {String} strID the id of the transaction to dispute
	     */
    	function doDispute (strID) {
    		var request = $http({
			    				method: 'post',
		                        url: '../../api/transactions/' + strID + '/dispute',
		                        params: {}
		                    });

    		return request.then(handleSuccess, handleError);
		}

		function handleSuccess (result) {
			return result.data.message;
		}

		function handleError( result ) {
			if (!angular.isObject(result.data) || !result.data.message) {
				return $q.reject('An unknown error occurred.');
			}
			return $q.reject(result.data.message);
		}

		return ({
			doDispute: doDispute
		});
}]);

