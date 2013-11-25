<?php
/**
 * User: Gabriel Acosta
 * Date: 11/20/13
 * Time: 8:13 AM
 */

use Illuminate\Database\Eloquent\Collection as Collection;

class UserControllerTest extends TestCase {

    protected $user;
    protected $foundUser;
    protected $collection;

    public function setUp(){
        parent::setUp();

        /**
         * Partial Mock
         */

        $this->user = Mockery::mock(new User);

        $this->foundUser = Mockery::mock(new User);
        $this->foundUser->id = 1;
        $this->foundUser->username = "user";
        $this->foundUser->email = "a@a.com";

        $this->app->instance('User',$this->user);


    }

    public function teardown(){
        Mockery::close();
    }

    public function getJsonResponse(){
        return json_decode($this->client->getResponse()->getContent() , true);
    }

    public function testIndex(){



        $collection = new Collection();
        $collection->push($this->foundUser);

        $this->user
            ->shouldReceive('all')
            ->once()
            ->andReturn($collection);

        $this->client->request('GET','/admin/user');

        $response = $this->getJsonResponse();

        $this->assertResponseOk();


        $this->assertTrue($response[0]['id'] == $this->foundUser->id);

        $this->assertTrue($response[0]['username'] == $this->foundUser->username);

        $this->assertTrue($response[0]['email'] == $this->foundUser->email);

    }

    public function testStore(){

        $this->user->id = $this->foundUser->id;

        $this->user
            ->shouldReceive('save')
            ->once()
            ->andReturn(true);


        $this->client->request('POST','/admin/user' , $this->foundUser->toArray() );


        $this->assertTrue( $this->user->username == $this->foundUser->username );

        $this->assertTrue( $this->user->email == $this->foundUser->email );

    }

    public function testShow(){

        $this->user
            ->shouldReceive('find')
            ->once()
            ->with($this->foundUser->id)
            ->andReturn($this->foundUser);

        $this->client->request('GET','/admin/user/'.$this->foundUser->id);

        $response = $this->getJsonResponse();

        $this->assertTrue($response['id'] == $this->foundUser->id);

        $this->assertTrue($response['username'] == $this->foundUser->username);

        $this->assertTrue($response['email'] == $this->foundUser->email);


    }

    public function testUpdate(){
        $this->user
            ->shouldReceive('find')
            ->once()
            ->with($this->foundUser->id)
            ->andReturn($this->foundUser);

        $this->foundUser
            ->shouldReceive('save')
            ->once()
            ->andReturn(true);


        $datos = array(
            'username' => 'testUser',
            'email'    => 'someEmail'
        );

        $this->client->request('PUT','/admin/user/'.$this->foundUser->id , $datos );

        $this->assertTrue($this->foundUser->username == $datos['username']);

        $this->assertTrue($this->foundUser->email == $datos['email']);

    }

    public function testDestroy(){

        $this->user
            ->shouldReceive('find')
            ->once()
            ->with($this->foundUser->id)
            ->andReturn($this->foundUser);

        $this->foundUser
            ->shouldReceive('delete')
            ->once()
            ->andReturn(true);


        $this->client->request('DELETE','/admin/user/'.$this->foundUser->id);



    }


}