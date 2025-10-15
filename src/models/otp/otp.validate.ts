import z from "zod";

const otpSchemaValidation = z.object({
    identifier: z.string({
    message: "identifier is required",
  }),
  action: z.string({
    message: "action is required",
  }),
});
export type otpInput = z.infer<typeof otpSchemaValidation>;

export const userValidate={
    otpSchemaValidation
}