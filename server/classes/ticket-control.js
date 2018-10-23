const fs = require('fs');

class Ticket {

    constructor(numTicket, escritorio) {

        this.numTicket = numTicket;
        this.escritorio = escritorio;
    }

}


class TicketControl {

    constructor() {

        this.hoy = new Date().getDate();

        let data = require('../data/data.json');
        this.ultimo = 0;
        this.ticketPendientes = [];
        this.ultimos4 = [];

        if (this.hoy === data.hoy) {
            console.log('hoy es hoy ');
            this.ultimo = data.ultimo;
            this.ticketPendientes = data.ticketPendientes;
            this.ultimos4 = data.ultimos4;

        } else {
            
            this.reiniciarSistema();

        }
    }

    atenderTicket(escritorio) {
        
        if (this.ticketPendientes.length === 0) {
            return {numTicket:'No hay tickets pendientes...'};
        } else {
           
            let numeroTicket = this.ticketPendientes[0].numTicket;
            this.ticketPendientes.shift();
            let atenderTicket = new Ticket(numeroTicket,escritorio);
            this.ultimos4.unshift(atenderTicket);

            if(this.ultimos4.length > 4){
                this.ultimos4.pop();
            }
            
           this.saveData();
           return atenderTicket;
        }

    }

    reiniciarSistema() {
        this.ultimo = 0;
        this.ticketPendientes = [];
        this.ultimos4 = [];
        console.log('Hoy es un nuevo dia sistema reiniciado');
        this.saveData();
    }

    siguienteNumero() {

        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.ultimo, null);
        this.ticketPendientes.push(ticket);
        this.saveData();

        return `Ticket: ${this.ultimo}`;
    }
    getUltimoTicket() {
        let dataJson = this.getData()
        return `Ticket: ${dataJson.ultimo}`;
    }

    getUltimosCuatro(){
        return this.ultimos4;

    }

    getData() {
        let data = fs.readFileSync('./server/data/data.json');
        let dataJson = JSON.parse(data);
        return dataJson;
    }
    saveData() {

        let data = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ticketPendientes: this.ticketPendientes,
            ultimos4: this.ultimos4
        }
        let jsonData = JSON.stringify(data);
        fs.writeFileSync('./server/data/data.json', jsonData);
    }
}

module.exports = {
    TicketControl
}