import { UserView } from '../views/user.view';
export class LoginOutput{
    user:UserView
    ["https://hasura.io/jwt/claims"]: {
        ["x-hasura-allowed-roles"]: string[];
        ["x-hasura-default-role"]: string;
        ["x-hasura-user-id"]:string;
    }
}