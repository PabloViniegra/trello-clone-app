 export interface Status {
    valid: boolean;
    message?: string;
}

export type Rule = (value: string) => Status;
