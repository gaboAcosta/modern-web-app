/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 12/3/13
 * Time: 8:40 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('mainApp')
  .factory('UserService',function($resource){

    var UserS = $resource('/admin/user/:id',{id:'@id'},{
      update: {method:'PUT' , params:{id:'@id'}}
    });

    UserS.new = function(){
      return new UserS();
    }

    return UserS;

  });