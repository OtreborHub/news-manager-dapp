import { Provider } from "ethers";

interface NavbarProps {
    provider: Provider;
    signer: string;
    balance: string;
    connectWallet: () => void;
}

interface HomeProps {
    chainId: number;
    signer: string;
    provider: Provider;
}

interface ErrorProps {
    errorMessage: string;
}

interface News {
    address: string;
    title: string;
    expireDate: string;
    validators: string[];
    validationsRequired: number;
    valid: boolean; 
}

export type { NavbarProps, HomeProps, ErrorProps, News }