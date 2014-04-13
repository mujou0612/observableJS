ObservableJS: A tiny function to create objects with 'observable' properties.
=============

ObservableJS can turn javascript objects with property/value pairs into 'observale' ones. The 'observable' objects here indicates that properties will trigger specific hooked event handlers when they are got changed(updated/removed).

Observable objects provide a more modular way to organize behaviors on client-side data model when building web apps.  

###- Create observable objects###
Create an observable object with observableJS is quite straightforward:

        var observableObject = $.observale({
              property1: value1,
              property1: value1,
              property1: value1,
              ...
        });

###- Getter/Setter###

Properties themselves of observable objects made by observaleJS are function acting as getter/setter to retrieve and update values of the properties.

        observableObject.property1();         // value1
        observableObject.property1(newValue); // set value1 to newValue !

###- Observe properties###

Use **onUpdate** and **onRemove** can hook event handler (callback function) on properties of observable objects produced by observableJS.

Once values of these hooked properties are updated/removed, the corresponding event handlers will be invoked automatically. Below is a simple example to illustrate the idea:

        // Hooks an update event handelr on property1
        observableObject.peoperty1.onUpdate(function(){
            console.log("property1 being updated");
        });

        // Call setter to update value of property1
        observableObject.peoperty1(newVlaue);

       // Then output "property1 being updated" automatically on browser 
          console.

###- Delete properties###
Call **remove()** on a property can delete the property itself and all hooked event handlers on it.
        
        // Delete the property from observableObject
        observableObject.property1.remove(); 

###NOTE: objects are "recursively affected" by observaleJS, which means that if the value of a propery is Array or another Object. its properies are tranformed into functions as getters/setters and can be hooked event handlers.

>To be more precisely, Arrays themselves are also Objects, and indexes (0, 1, 2, 3...) are in fact properties of them.

## A more detailed example:
    document.addEventListener("DOMContentLoaded", function() {

      var profile = $.observable({
        'name': 'xian yee',
        'age': 32,
        'detail': {
          'title': 'RD',
          'years': 8
        },
        'skills': [
            'scala', 'javascript','c/c++'
        ]
      });

      // Gets property
      console.log( profile.name() ); // output: xian yee
 
      // Gets property: property is another Object
      console.log( profile.detail.years() ); // output: 8

      // Gets property: property is Array
      console.log( profile.skills[1]() ); // output: javascript

      // Hooks 'update' event on 'detail.title' property
      profile.detail.title.onUpdate(function(old_val, new_val){
        console.log('title updated from ' + old_val + ' to ' + new_val);
      });

      // Updates 'details.title' property, which will trigger the hooled     
        'update' event.
      profile.detail.title('PM');

      // Hooks 'remove' event on 'age' property
      profile.age.onRemove(function(removed){
        console.log('age removed (' + removed + ')');
      });

      // Removes 'age' property, which will trigger the hooked 'remove' 
         event.
      profile.age.remove();

      // Causes an exception because the input of onRemove() must be 
         function.
      profile.name.onRemove("hello");

    }, false);
