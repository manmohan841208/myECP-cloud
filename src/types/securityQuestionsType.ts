export type SecurityQuestionPayload = {
  UserId: string;
  QuestionID: number;
  Answer: string;
  RememberDevice: boolean | undefined;
  RememberUserID: boolean;
};
