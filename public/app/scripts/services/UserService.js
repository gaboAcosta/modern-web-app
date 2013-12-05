/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 12/3/13
 * Time: 8:40 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('mainApp')
  .factory('UserService',function($resource){

    var User = $resource('/admin/user/:id',{id:'@id'},
      {update: {method:'PUT', params:{id:'@id'}}});

    User.new = function(){
      return new User();
    }

    return User;

  });

angular.module('mainApp').factory('PromocionService', function($resource) {
  //Definimos las funciones para Crear, Borrar y Actualizar utilizando los valores de Laravel
  var Promocion = $resource('/admin/user/:id',{id:'@id'},
    {update: {method:'PUT', params:{id:'@id'}}});
  Promocion.new = function(){
    return new Promocion();
  }
  return Promocion;
});