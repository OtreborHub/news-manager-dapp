import { useEffect, useState } from "react";
import '../styles/home.css';
import getContractInstance, { getNews, isUserValidator } from "../utils/contractBridge";
import { HomeProps, News } from "../utils/interfaces";
import NewsCard from "./NewsCard";

export default function Home({signer, provider}: HomeProps) {
    const NEWS_CAP = 5
    
    const [newsToEvaluate, setNewsToEvaluate] = useState<News[]>([]);
    const [isValidator, setIsValidator] = useState<boolean>();
    
    useEffect(() => {
        init();
        getFirstNews();
        // getLastNews();
    }, [])

    async function init(){
        getContractInstance(provider);
        isUserValidator(signer).then((result) => {
            setIsValidator(result[0]);
        });
    }

    async function getFirstNews(){
        var newsList: News[] = []; 
        await getNews(1).then((result) => {
            if(result){
                var record: News = {
                    address: result[0],
                    title: result[1],
                    expireDate: result[2],
                    validators: [],
                    validationsRequired: result[3],
                    valid: result[4]
                };
                newsList.push(record);
            }
        });
        setNewsToEvaluate(newsList);
    }

    async function getLastNews(){
        var newsList: News[] = [];
        for(let i = 0; i < NEWS_CAP; i++){
            let result = await getNews(i);
            if(result){
                var record: News = {
                    address: result[0],
                    title: result[1],
                    expireDate: result[2],
                    validators: [],
                    validationsRequired: result[3],
                    valid: result[4]
                };
                newsList.push(record);
            } else { 
                break;
            }
        }
        setNewsToEvaluate(newsList);
    }

    return (
        <div className="main-div">
            <div> {isValidator ? "Validatore": "Utente"} </div>
            {newsToEvaluate.map(el => 
                <NewsCard 
                address={el.address} 
                title={el.title}
                expireDate={el.expireDate} 
                validators={[]}
                validationsRequired={el.validationsRequired}
                valid={el.valid} />
            )}
        </div>
    )
}