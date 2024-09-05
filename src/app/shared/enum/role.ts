export enum Role {
    superAdmin = 'Super Admin',
    doctor = 'Doctor',
    admin = 'Admin',
    organisation = 'Organization'
}

export enum RoleCode {
    superAdmin = 0,
    Organisation = 1,
    Doctor = 2
}


export enum PendingStatusCode {
    patient = 0,
    transcript = 1,
    optimize = 2,
    summary = 3,
    codes = 4
}