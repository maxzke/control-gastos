class Ingreso{

    #listado=[];

    isNumber(importe){
        if (importe === '' || importe === null || isNaN(importe)) {
            return false;
        }else{
            return true;
        }
    }

    isValidDescription(descripcion){
        if (descripcion === '' || descripcion===null) {
            return false;
        }else{
            return true;
        }
    }

    add(ingreso){
        this.#listado.push(ingreso);
    }

    render(){
        let cadena = "";
        this.#listado.forEach(element => {
            cadena += `<div class="row row-hover">
                            <div class="col-md-2 text-right">
                                ${element.importe}
                            </div>
                            <div class="col-md-10">
                                ${element.descripcion}
                            </div>
                        </div>`
        });
        return cadena;
    }

}

class Gastos extends Ingreso{
    
}

class Saldo{
    
    #saldo =0;

    sumar(importe){
        this.#saldo += Number(importe);
    }
    restar(importe){
        this.#saldo -= Number(importe);
    }

    render(){
        return `<span class="badge rounded-pill bg-success py-2 px-2">Saldo $ ${this.#saldo}</span>`;
    }

}

const saldo = new Saldo();
const contentSaldo = document.querySelector('#contentSaldo');

const ingreso = new Ingreso();
const addIngreso = document.querySelector('.storeIngreso');
const descripcionIngreso = document.querySelector('#descripcionIngreso');
const importeIngreso = document.querySelector('#importeIngreso');
const contentIngresos = document.querySelector('#contentIngresos');


addIngreso.addEventListener('click', function(){
    if (ingreso.isNumber(importeIngreso.value) && ingreso.isValidDescription(descripcionIngreso.value)) {
        importeIngreso.classList.remove('is-invalid');
        descripcionIngreso.classList.remove('is-invalid');
        let arg ={
            importe:importeIngreso.value,
            descripcion:descripcionIngreso.value
        }
        ingreso.add(arg);

        saldo.sumar(arg.importe);
        contentSaldo.innerHTML = saldo.render();

        contentIngresos.innerHTML=ingreso.render();
        importeIngreso.value = "";
        descripcionIngreso.value = "";
    }else{
        if (! ingreso.isNumber(importeIngreso.value) ) {
            importeIngreso.classList.add('is-invalid');
        }else{
            importeIngreso.classList.remove('is-invalid');
        }
        if (! ingreso.isValidDescription(descripcionIngreso.value) ) {
            descripcionIngreso.classList.add('is-invalid');
        }else{
            descripcionIngreso.classList.remove('is-invalid');
        }
    }
});


const gasto = new Gastos();
const addGasto = document.querySelector('.storeGasto');
const descripcionGasto = document.querySelector('#descripcionGasto');
const importeGasto = document.querySelector('#importeGasto');
const contentGasto = document.querySelector('#contentGasto');


addGasto.addEventListener('click', function(){
    if (gasto.isNumber(importeGasto.value) && gasto.isValidDescription(descripcionGasto.value)) {
        importeGasto.classList.remove('is-invalid');
        descripcionGasto.classList.remove('is-invalid');
        let arg ={
            importe:importeGasto.value,
            descripcion:descripcionGasto.value
        }
        gasto.add(arg);

        saldo.restar(arg.importe);
        contentSaldo.innerHTML = saldo.render();

        contentGasto.innerHTML=gasto.render();
        importeGasto.value = "";
        descripcionGasto.value = "";
    }else{
        if (! gasto.isNumber(importeGasto.value) ) {
            importeGasto.classList.add('is-invalid');
        }else{
            importeGasto.classList.remove('is-invalid');
        }
        if (! gasto.isValidDescription(descripcionGasto.value) ) {
            descripcionGasto.classList.add('is-invalid');
        }else{
            descripcionGasto.classList.remove('is-invalid');
        }
    }
});