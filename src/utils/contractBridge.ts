import { Contract, Provider } from "ethers";
import abi from "./abi.json";
import { News } from "./interfaces";

const NEWS_CAP = 5
// const CONTRACT_ADDRESS: string = (process.env.NEWS_MANAGER_ADDRESS as string);
const CONTRACT_ADDRESS: string = "0x44820937c86B83625e6E7bd1Fa461894931C9860"
let contractInstance: Contract;


export default function getContractInstance(provider:Provider){
    if(!contractInstance){
        contractInstance = new Contract(CONTRACT_ADDRESS, abi, provider);
    }
}

export async function getNews(index: number){
    try {
        if(contractInstance){
            const news = await contractInstance.news(index);
            return news;
        }
    } catch {
        console.log("Impossibile trovare news all'indice indicato");
    }
}




export async function getAllNews(): Promise<News[]>{
    var newsList: News[] = [];
    let lastIndex = 0;
    try {
        if(contractInstance){
            for(let i = 0; i < NEWS_CAP; i++){
                const result = await contractInstance.news(i);
                if(result){
                    let newRecord: News = {
                        address: result[0],
                        title: result[1],
                        expireDate: result[2],
                        validators: [],
                        validationsRequired: result[3],
                        valid: result[4]
                    }
                    newsList.push(newRecord);
                    lastIndex = i;
                }
            }
        }
    } catch {
        console.log("Ultimo indice trovato:" + lastIndex);
    } finally {
        return newsList;
    }
    
}

export async function isUserValidator(signer: string){
    if(contractInstance){
        return await contractInstance.searchValidator(signer);
    }
}
