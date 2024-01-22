import { Contract, Provider } from "ethers";
import abi from "./abi.json";

let newsManagerContract: Contract;

// const CONTRACT_ADDRESS: string = (process.env.NEWS_MANAGER_ADDRESS as string);
const CONTRACT_ADDRESS: string = "0x44820937c86B83625e6E7bd1Fa461894931C9860"

export default function getContractInstance(provider:Provider){
    if(!newsManagerContract){
        newsManagerContract = new Contract(CONTRACT_ADDRESS, abi, provider);
    }
}

export async function getNews(index: number){
    if(newsManagerContract){
        const news = await newsManagerContract.news(index);
        return news;
    }
}

export async function isUserValidator(signer: string){
    if(newsManagerContract){
        return await newsManagerContract.searchValidator(signer);
    }
}
