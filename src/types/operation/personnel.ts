export interface IPersonnelCreate {
    id: string;
    first_name: string;
    last_name: string;
    work_email: string;
    title: string;
    work_title_id: number;
    role_id: number;
    location_id: number;


    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type IPersonnel = {
    id: string;
    address?: string;
    birthdate?: string;
    created_at: string;
    expiration_date?: string;
    first_name: string;
    identity_number?: string;
    is_active: boolean;
    last_name: string;
    location: {
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
    };
    location_id: string;
    nationality?: string;
    personal_email?: string;
    role: {
        created_at: string;
        id: number;
        name:  "superAdmin" | "admin" 

        updated_at: string;
    };
    role_id: string;
    supervisor_id?: string;
    telephone: string;
    title: string;
    updated_at: string;
    work_email: string;
    work_title: {
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
    };
    work_title_id: string;
}


export type IUpdatePersonnel = {
    address?: string | undefined;
    birthdate?: string | undefined;
    expiration_date?: string | undefined;
    first_name?: string | undefined;
    identity_number?: string | undefined;
    is_active?: boolean | undefined;
    last_name?: string | undefined;
    nationality?: string | undefined;
    personal_email?: string | undefined;
    supervisor_id?: string | undefined;
    telephone?: string | undefined;
    updated_at?: string | undefined;
}


export type ValidationErrors = {
    first_name?: string;
    personal_email?: string;
    telephone?: string;
}

