type UserInfo = {
  UserId: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  CID: string;
  LastLoginDate: string; // or Date if parsed
  Token: string; // JWT token
  Expiration: string; // ISO date string
  NavigateToSecPage: boolean;
  Account: {
    FirstName: string;
    MiddleName: string;
    LastName: string;
  };
};
