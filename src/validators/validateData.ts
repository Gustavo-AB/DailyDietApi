

export class Validate {

    public  validateData(value:any, toType:any):any{
        try{
            switch(toType){
                case "string": value.toString();
                case "number": Number(value)
            }
        } catch{
            throw new Error("values cannot be converted")
        }

        return value
    }
}

export const validator = new Validate()