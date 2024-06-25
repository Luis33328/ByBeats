import { SignIn } from "src/app/authentication/signIn/model/signIn.model";

export class Beat {

    constructor() { }

    
    public guidBeat: Number;
    public titulo: String;
    public nota: String;
    public bpm: String;
    public imagem: String;
    public dataLancamento: String;
    public tags: String;
    public precoBasic: String;
    public precoPremium: String;
    public precoUnlimited: String;
    public discount: Number;
    public wavTagged: String;
    public wavUntagged: String;
    public stems: String;
    public selected: number;
    public usuario: SignIn;
}