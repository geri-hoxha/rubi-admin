import { filterText } from "@/components/static";

 
export const columns = [
    {
        headerName: 'User ID',
        field: 'id'
    },
    {
        headerName: 'User Email',
        field: 'email',
        ...filterText
    },
    {
        headerName: 'Personal Number',
        field: 'personal_number',
        ...filterText

    },
    {
        headerName: 'Country',
        field: 'country',
        ...filterText
    },
    {
        headerName: 'Username',
        field: 'username'
    },
    {
        headerName: 'First Name',
        field: 'name'
    },
    {
        headerName: 'Last name',
        field: 'surname'
    },
    {
        headerName: 'Phone',
        field: 'phone'
    },
    {
        headerName: 'Segments',
        field: '-'
    },
    {
        headerName: 'Deposit Activity',
        field: 'deposit_activity'
    },
    {
        headerName: 'Balance',
        field: 'balance'
    },
    {
        headerName: 'Bonus',
        field: 'bonus'
    },
    {
        headerName: 'Currency',
        field: 'currency'
    },
    {
        headerName: 'Parent',
        field: 'parent_name'
    },
    {
        headerName: 'Last Activity',
        field: 'last_activity'
    },
    {
        headerName: 'Date Created',
        field: 'created_at'
    },
    {
        headerName: 'Type',
        field: 'type'
    },
    {
        headerName: 'KYC',
        field: 'kyc'
    },
    {
        headerName: 'Member Status',
        field: ''
    },
    {
        headerName: 'User Status',
        field: 'status'
    },
    {
        headerName: 'Ip',
        field: 'ip'
    },
    {
        headerName: 'Tier Level',
        field: 'tier_level'
    },
]