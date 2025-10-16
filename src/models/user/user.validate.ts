import z from "zod";

const registrationSchemaValidation = z.object({
  name: z.string({
    message: "name is required",
  }),
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
    // image: z.string().url("Image must be a valid URL").optional(),
    otp:z.string().nonempty('OTP is required'),
    role: z.enum(["USER", "ADMIN"]),
    phone:z.string({message:"phone number is required"}).optional(),
    country: z.string().max(100, "Country name is too long").optional(),
  
    city: z.string().max(100, "City name is too long").optional(),
  
    state: z.string().max(100, "State name is too long").optional(),
  
    zip_code: z.string().max(20, "Zip code is too long").optional(),
  
    address: z.string().max(200, "Address is too long").optional(),
  
    about: z.string().max(500, "About section is too long").optional(),
  
    is_deleted: z.boolean().optional(),
});
export type RegistrationInput = z.infer<typeof registrationSchemaValidation>;

export const userValidate={
    registrationSchemaValidation
}