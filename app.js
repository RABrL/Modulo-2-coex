document.addEventListener('DOMContentLoaded', function(){

    //Creo el objeto para guardar la informacion del registro
    const registro = {
        nombres: '',
        apellidos: '',
        email: '',
        celular: ''
    }

    //Seleccionar los elementos de la interfaz
    const $ = selector => document.querySelector(selector)
    const inputEmail = $('#email');
    const inputNombre = $('#nombres');
    const inputApellido = $('#apellidos')
    const inputCelular = $('#celular')
    const innerRegistro = $('#registro')
    const formulario = $('#formulario')  
    const btnEnviar = $('#boton-enviar')
    const spinner = $('#spinner') 
    const alerta = $('#alerta-exito')   

    inputEmail.addEventListener('input', validar);
    inputNombre.addEventListener('input', validar);
    inputApellido.addEventListener('input', validar);
    inputCelular.addEventListener('input',validar);
    formulario.addEventListener('submit', enviarRegistro);  

    //Validar si los campos son correctos
    function validar(e){
        if(!e.target.value ){
            mostrarAlerta(e.target.parentElement,`El campo ${e.target.id} es obligatorio`)
            agregarValoresRegistro(e)
            comprobarRegistro(); 
            return;
        }

        if(e.target.value.length > 50 ){
            mostrarAlerta(e.target.parentElement,`El campo ${e.target.id} no puede tener mas de 50 caracteres`)
            agregarValoresRegistro(e)
            comprobarRegistro(); 
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(e.target.parentElement, 'El email no es valido')
            registro.email = ''
            comprobarRegistro();  
            return;
        }

        if(e.target.id === 'celular' && !validarCelular(e.target.value)){
            mostrarAlerta(e.target.parentElement, 'El celular no es valido')
            registro.celular = ''
            comprobarRegistro();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        
        //Asignar los valores al objeto
        agregarValoresRegistro(e)

        //Comprobar el objeto de email
        comprobarRegistro(); 
    }

    //Muestra una alerta en rojo para que el usuario sepa que la informacion no es correcta
    function mostrarAlerta(referencia,mensaje){
        
        limpiarAlerta(referencia)

        //Generar alerta HTML
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-danger', 'text-white','text-center','p-2','mt-2')

        //Creo la referencia del padre al cual voy a agregar el parrafo de error
        
        referencia.appendChild(error)
    }

    //Limpia la alerta si la informacion ya es correcta
    function limpiarAlerta(referencia){
        //Comprueba si ya existe el parrafo de error
        const alerta = referencia.querySelector('.bg-danger')
        if(alerta) alerta.remove()
    }

    //Valida el email con una expresion regular
    function validarEmail(email){
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@dominio.com?/g

        const resultado = regex.test(email)

        return resultado
    } 

    //Valida el numero de telefono con una expresion regular
    function validarCelular(celular){
        const regex = /^3[0-9]{9}$/gm;

        const resultado = regex.test(celular)

        return resultado
    }

    //Agrego la informacion de los inputs al objeto registro
     function agregarValoresRegistro(e){
        
        registro[e.target.id] = e.target.value.trim().toLowerCase();//.trim() sirve para quitar los espacios seguidos de un string
    } 

    //Comprueba que todos los campos sean correctos y esten llenos, para activar o desactivar el boton de enviar
    function comprobarRegistro(){
        if(!Object.values(registro).includes('')){
            btnEnviar.classList.remove('opacity-25')
            btnEnviar.disabled = false
            
        }else{
            btnEnviar.classList.add('opacity-25')
            btnEnviar.disabled = true
        }

    }

    //Creamos el HTML con la informacion del registro
    function crearHTML(){

        const ul = document.createElement('ul')
        ul.classList.add('list-group','text-center')

        const encabezado = document.createElement('li')
        encabezado.classList.add('list-group-item','active')
        const titulo = `Elementos`;
        encabezado.innerHTML = titulo
        ul.appendChild(encabezado)

        for(let key in registro){
            const li = document.createElement('li')
            li.classList.add('list-group-item')
            const text = registro[key];
            li.innerHTML = text
            ul.appendChild(li)
        }
        innerRegistro.appendChild(ul)
        innerRegistro.classList.remove('visually-hidden')
    }  

    //Reiniciamos el formulario y el objeto registro
    function resetForm(e){
        formulario.reset();
        Object.keys(registro).forEach(x =>{
            registro[x] = ''
        })
        comprobarRegistro()
    }  

    //Hace la animacion del spinner y da una alerta de que el registro fue correcto
    function enviarRegistro(e){
        e.preventDefault();

        spinner.classList.remove('visually-hidden')

        setTimeout(()=>{
            spinner.classList.add('visually-hidden')
            //Crear una alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-success','text-white','p-2','rounded-2','mt-2','fw-bold','text-center','text-uppercase');

            alertaExito.textContent = 'Registrado con exito';
            
            alerta.appendChild(alertaExito);
            
            setTimeout(() =>{
                alertaExito.remove();
            },3000);
            
            crearHTML(); 
            resetForm()
        },3500);
        
    }
})
