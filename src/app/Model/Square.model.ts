export class Square{
    private _X:number;
    private _Y:number;
    constructor(x:number,y:number){
        this._X = Math.floor(x);
        this._Y = Math.floor(y);
    }
     get X(){
         return this._X
     }
     get Y(){
        return this._Y
    }
}