---
layout: post
title: Test-Private-Function-In-Php
cat: phpunit
---


Demo class

```php
class Foo {

    public function __construct() {
        //do some construct
    }

    private function plus($a , $b) {
        return $a + $b;
    }

}
```


phpunit test


```php
class FooTest extends PHPUnit_Framework_TestCase {

     public function setUp()
     {
         //do some setup here...
     }

     public function test_plus()
     {
         //get function plus
         $method = new \ReflectionMethod(new \Foo() , 'plus');

         //set accessible
         $method->setAccessible(true);

         //invoke function
         $testres = $method->invoke(new Foo() , 2 , 3);

         //test function
         $this->assertEquals(5 , $testres);
     }

}
```
