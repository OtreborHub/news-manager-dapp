enum ErrorMessage {
    WL="Please connect your wallet",
    SP="Please connect your provider to Sepolia Testnet",
    DFT="Something went Wrong!"
}

export default function parseErrorMessage(code: string): string{
    switch(code){
        case "SP":
            return ErrorMessage.SP;
        case "WL":
            return ErrorMessage.WL;
        default:
            return ErrorMessage.DFT;
    }
}

