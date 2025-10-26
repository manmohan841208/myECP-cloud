export type SendOtpPayload = {
  UserId: string;
  OtpOption: 'Email' | 'SMS' | '';
};
