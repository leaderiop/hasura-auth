export const  GetUserByUsernameQuery=`query GetUserByUsername($username:String){
  management_user(where:{username:{_eq:$username}}){
    id
  }
}`

export const GetUserByUsernameAndPasswordQuery=`query GetUserByUsername($username:String,$password:String){
    management_user(
        where:{
            username:{_eq:$username},
            password:{_eq:$password}
        }
    ){
        CIN
        email
        firstname
        id
        join_at
        lastname
        left_at
        updated_at
        username
        created_at
    }
}`

export const InsertUserQuery=`mutation InsetUser(
  $firstname:String,
  $lastname:String,
  $username:String,
  $password:String,
  $email:String,
  $CIN:String
  ) {
  insert_management_user_one(object: {
      CIN: $CIN, 
      email: $email, 
      firstname: $firstname, 
      lastname: $lastname, 
      password: $password, 
      username: $username
  }) {
    CIN
    email
    firstname
    id
    join_at
    lastname
    left_at
    updated_at
    username
    created_at
  }
}`