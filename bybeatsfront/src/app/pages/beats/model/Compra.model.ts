import { SignIn } from "src/app/authentication/signIn/model/signIn.model";
import { Beat } from "./beat.model";
import { Pedido } from "./Pedido.model";

export class Compra {

    constructor() { }

    
    public guidCompra: Number;
    public beat: Beat;
    public usuario: SignIn;
    public licenca: String;
    public pedido: Pedido;

}