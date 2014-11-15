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
    		return $http({
			    			method: 'get',
		                    url: '../../api/transactions',
		                    params: strOrder ? {sort: strOrder} : null
		                 })
    				.success(handleSuccess)
    				.error(handleError);
		}

		function handleSuccess (result) {
			return result.data;
		}

		function handleError( result ) {
			if (!angular.isObject(result) || !result.data.message) {
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

    		return $http({
		    				method: 'post',
	                        url: '../../api/transactions/' + strID + '/dispute'
	                    })
    				.success(handleSuccess)
    				.error(handleError);
		}

		function handleSuccess (result) {
			return result.message;
		}

		function handleError(result) {
			if (!angular.isObject(result) || !result.message) {
				return $q.reject('An unknown error occurred.');
			}
			return $q.reject(result.message);
		}

		return ({
			doDispute: doDispute
		});
}]);

