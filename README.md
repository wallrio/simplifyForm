# simplifyForm
This plugin simplifies form handling

### Installation
Insert the script into your HTML document

	<script type="text/javascript" src="simplifyForm.js"></script>

### Usage
Register the form that you want to manipulate and add some action.

#### Example 1

The example below uses the form to capture the contents of a file.

	<form class="forms" name="example1-form">		
		<input type="submit" value="submit"/>
		<div id="resultForm-example1"></div>
	</form>

	<script type="text/javascript">		simplifyForm.register('[name="example1-form"]',{
				    action:'example1-test1.txt',  
				    method:"get",
				    callback:function(response){               	        
				        document.querySelector('#result-example1').innerHTML = response;	     
				    },
				    validator:function(data){       
				    	document.querySelector('#result-example1').innerHTML = "wait, requisiting...";	     	      
				    }
				});
	</script>

#### Example 2

The example below sends the form fields to a php script.

	<form class="forms" name="example2-form">	
		<input name="name" type="text" placeholder="Name:" required>
		<input name="email" type="email" placeholder="Email:" required>
		<input type="submit" value="submit"/>
		<div id="resultForm-example2"></div>
	</form>

	<script type="text/javascript">		simplifyForm.register('[name="example2-form"]',{
		    action:'example2.php',  
		    method:"get",
		    callback:function(response){        		    	       	       
		        document.querySelector('#result-example2').innerHTML = response;	     
		    },
		    validator:function(data){       
		    	document.querySelector('#result-example2').innerHTML = "wait, requisiting...";	     	      
		    }
		});

	</script>


## Callback
	
To perform an action after return of the form submission

	callback:function(response,dataSend){        		    	       	       
        // code javascript	     
    },

- response =  Contains the form's response.
- dataSend =  Contains the form fields.

## Customize the validation

To customize the validation it is possible to use the validator method, the data parameter contains the fields of the form, so it is possible to capture information and validate them.

Because the date parameter is an object, it is possible to include values to be sent along with field values, so include a property in the 'data' object.

#### Example:

		validator:function(data){      
			data.age = 32;
			data.mode = 'record';
		}

It is also possible to change existing field values.

To prevent the submission of the form return false for the validator function.

#### Exemplo:

		validator:function(data){       
	    	return false;     	      
	    }

## onregister	    

It is a function that is executed at the time of registration of the form

	onregister:function(elements,listArray){        		    	       	       
        // code javascript	     
    },






## simplifyForm.focus

Defines the form element that will receive the initial focus, if the element is omitted, the first element receives the focus.

	simplifyForm.focus(formId,elemendId);

- formId = Identification of the form, can be the ID/NAME or any other that identifies the form.

- elemendId = Identification of the form element, can be the ID/NAME or any other that identifies the form element.

#### Example:

	simplifyForm.focus('[name="form-register"]','[name="username"]');

## simplifyForm.clear

Clears one or all fields of the form.

	simplifyForm.clear(formId,elemendId);

- formId =	Identification of the form, can be the ID / NAME or any other that identifies the form.

- elemendId	= Identification of the form element, can be the ID / NAME or any other that identifies the form element.

#### Example:

	simplifyForm.clear('[name="form-register"]');

## simplifyForm.input(formId)

Capture form elements as object

	simplifyForm.input(formId).[elemendName].[PROPERTY-OF-THE-ELEMENT]

#### Example:

	var email = simplifyForm.input('[name="form"]').email.value;


## simplifyForm.populate	

Fill in the fields in the form based on an object list, with key and value.

	simplifyForm.populate(formId,arrayInputs,callback);

- formId = Identification of the form, can be the ID / NAME or any other that identifies the form

- arrayInputs = List containing the field names of the form with their respective value

- callback = Event to be fired after filling

#### Example:

	<form name="example2-form">	

		<input name="name" type="text" placeholder="Name:">
		<input name="email" type="text" placeholder="Email:">
		<input name="username" type="text" placeholder="Username:">
		<input name="password" type="password" placeholder="Password:">

		<input type="submit" value="submit"/>		
	</form>

	var arrayInputs = {
		name:'Fulano da silva',
		email:'email@domain.com',
		username:'fulano.silva',
		password:'password'
	}

	simplifyForm.populate('[name="example2-form"]',arrayInputs,function(data){
		var email = data.email.value;
	});

