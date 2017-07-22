window.onload = function(){
    var binds = document.querySelectorAll('input[data-abind]');

    for(var i=0;i<binds.length;i++){
        var input = binds[i];
        var name = input.dataset.abind;
        AB_defineProperty(input, name);
        AB_addChangeEventListener(input,name);
    }
}


//>> [AB_defineProperty]
//Declares a global variable which both of its accesors read and update the bound input(s) value.
function AB_defineProperty(input, name){
    window["$ab_" + name] = input.value;
    Object.defineProperty(window, name,{
        get: function(){ return window["$ab_" + name]; },
        set: function(newValue) {
            var bindListeners = document.querySelectorAll('[data-abind="'+name+'"]');

            for(var i=0;i<bindListeners.length;i++){
                bindListeners[i].value = newValue;
            }

            window["$ab_" + name] = newValue;
        }
    });

    
}

//>> [AB_addChangeEventListener]
//Updates the global variable whenever the change event is invoked.
function AB_addChangeEventListener(input, name){
    input.addEventListener("change",function(){
        window[name] = input.value;
    })
}