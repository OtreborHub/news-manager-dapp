import { useEffect, useState } from "react";
import '../styles/home.css';
import getContractInstance, { getAllNews, getNews, isUserValidator } from "../utils/contractBridge";
import { HomeProps, News } from "../utils/interfaces";
import NewsCard from "./NewsCard";

export default function Home({signer, provider}: HomeProps) {
    
    const [validNews, setValidNews] = useState<News[]>([]);
    const [invalidNews, setInvalidNews] = useState<News[]>([]);
    const [isValidator, setIsValidator] = useState<boolean>();
    
    useEffect(() => {
        init();
        getLastNews();
    }, [])

    async function init(){
        getContractInstance(provider);
        isUserValidator(signer).then((result) => {
            setIsValidator(result[0]);
        });
    }

    async function getLastNews() {
        await getAllNews().then((result: News[]) => {
            let validNews: News[] = []
            let invalidNews: News[] = []
            result.map((news: News) => {
                if(news.valid == true){
                    validNews.push(news);
                } else {
                    invalidNews.push(news);
                }
            })
            setValidNews(validNews);
            setInvalidNews(invalidNews);
        })
    }

    return (
        <div className="main-div">
            <h3> Account {isValidator ? "Validatore": "Utente"} </h3>
            <div className="news-div" style={{ width: "100%"}}>
                <div className="validator-news">
                { isValidator && 
                    <div className="item">
                        <h5> Pending News </h5>
                            {invalidNews.map(el => 
                                <NewsCard
                                key={el.address} 
                                address={el.address} 
                                title={el.title}
                                expireDate={el.expireDate} 
                                validators={[]}
                                validationsRequired={el.validationsRequired}
                                valid={el.valid} />
                            )}
                    </div>
                }
                    <div className="item">
                    <h5> News released </h5>
                        {validNews.map(el => 
                            <NewsCard
                            key={el.address} 
                            address={el.address} 
                            title={el.title}
                            expireDate={el.expireDate} 
                            validators={[]}
                            validationsRequired={el.validationsRequired}
                            valid={el.valid} />
                        )}
                    </div>
            </div> 
        </div>
    </div>
    )
}