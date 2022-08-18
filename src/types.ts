export type User = {
    userId: number;
    name: string;
    email: string;
    password: string;
    promises: Promise[];
}

export type Promise = {
    promiseId: number;
    userId: number;
    addictionId: number;
    name: string;
    expiredDate: string;
    startDate: string;
    reasons: Reason[];
}

export type Addiction = {
    addictionId: number;
    name: string;
    description: string;
    promises?: Promise[];
}
export type Reason = {
    promiseId: number,
    reasonId: number,
    description: string
}