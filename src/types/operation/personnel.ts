export interface IPersonnel {
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
