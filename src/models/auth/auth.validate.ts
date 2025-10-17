import z from "zod";

const loginSchemaValidation = z.object({
  email: z
    .email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    })
    .nonempty("email is required"),

  password: z
    .string({
      message: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .nonempty("password is required"),
    role: z.enum(["USER", "ADMIN"]),

});
export type loginInput = z.infer<typeof loginSchemaValidation>;

export const authValidate = {
  loginSchemaValidation,
};
