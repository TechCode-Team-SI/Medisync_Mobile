export type TUser = {
    phone: string;
    id: string;
    email: string;
    fullName: string;
    photo?: TPhoto;
    roles: any;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string;
};

export type TPhoto = {
    id: string;
    path?: string;
}

export type TPhotoResult = {
    file: {
        id: string;
        path: string;
    };
};

export type TPhotoUserUpload = {
    photo?: TPhoto;
    fullName?: string;
    phone?: string;
};