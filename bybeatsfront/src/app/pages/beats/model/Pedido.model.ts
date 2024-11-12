import { SignIn } from "src/app/authentication/signIn/model/signIn.model";
import { Beat } from "./beat.model";

export class Pedido {

    constructor() { }

    
    public guidPedido: Number;
    public usuario: SignIn;
    public total: String;

}